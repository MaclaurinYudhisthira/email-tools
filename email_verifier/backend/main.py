from fastapi import FastAPI, UploadFile, File
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import uvicorn
from api.verify import validate_email, process_file
from api.email import generate_otp, send_otp_email
from utils.constant import PROCESSED_FOLDER, UPLOAD_FOLDER
import os
from database.database import Base, SessionLocal, engine
from utils.auth import hash_password, verify_password, create_jwt_token, verify_token
from database.user import User
from serializer.login import UserLogin, UserCreate, OTPVerify


app = FastAPI()


Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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
    user = db.query(User).filter(User.email == login_data.username).first()
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
    processed_file_path = process_file(file_path)

    return {"message": "File processed successfully", "processed_file": processed_file_path}


@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(PROCESSED_FOLDER, filename)
    return FileResponse(file_path, media_type="application/octet-stream", filename=filename)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
