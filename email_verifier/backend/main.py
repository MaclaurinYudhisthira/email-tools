import os

import uvicorn
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from api.email import generate_otp, send_otp_email
from api.verify import process_file, validate_email
from database.database import Base, SessionLocal, engine
from database.user import User
from serializer.login import OTPVerify, UserCreate, UserLogin
from utils.auth import create_jwt_token, hash_password, verify_password, verify_token
from utils.constant import PROCESSED_FOLDER, UPLOAD_FOLDER

app = FastAPI()


Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.post("/signup/")
def signup(signup_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == signup_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(signup_data.password)
    otp = generate_otp()

    new_user = User(email=signup_data.email, hashed_password=hashed_pw, otp=otp)
    db.add(new_user)
    db.commit()

    send_otp_email(signup_data.email, otp)
    return {"message": "OTP sent to email. Please verify."}


@app.post("/verify-otp/")
def verify_otp(opt_data: OTPVerify, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == opt_data.email).first()
    if not user or user.otp != opt_data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    user.is_verified = True
    user.otp = None
    db.commit()
    return {"message": "Email verified successfully. You can now log in."}


@app.post("/login/")
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not user.is_verified:
        raise HTTPException(status_code=400, detail="Email not verified")

    token = create_jwt_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/protected/", dependencies=[Depends(verify_token)])
def protected_route():
    return {"message": "Access granted"}


@app.post("/validate")
async def validate_email_func(email: str):
    return validate_email(email)


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save the uploaded file
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Process the file
    file_location,file_name = process_file(file_path)
    if file_location and file_name:
        return FileResponse(file_location, media_type='application/octet-stream', filename=file_name)

@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(PROCESSED_FOLDER, filename)
    return FileResponse(file_path, media_type="application/octet-stream", filename=filename)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
