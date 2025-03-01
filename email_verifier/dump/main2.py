from fastapi import FastAPI, HTTPException
import re
import dns.resolver
import smtplib

app = FastAPI()

def validate_email_format(email: str) -> bool:
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None

def get_mx_records(domain: str):
    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        return [str(record.exchange) for record in mx_records]
    except:
        return []

def check_smtp(email: str, mx_records: list) -> bool:
    for mx in mx_records:
        try:
            server = smtplib.SMTP(mx, timeout=10)
            server.helo()
            server.mail("test@example.com")
            code, message = server.rcpt(email)
            server.quit()
            if code == 250:
                return True
        except:
            continue
    return False

@app.post("/validate")
async def validate_email(email: str):
    if not validate_email_format(email):
        raise HTTPException(status_code=400, detail="Invalid email format.")
    
    domain = email.split('@')[-1]
    mx_records = get_mx_records(domain)
    if not mx_records:
        raise HTTPException(status_code=400, detail="No MX records found.")
    
    is_valid = check_smtp(email, mx_records)
    if not is_valid:
        return {"email": email, "status": "Invalid"}
    
    return {"email": email, "status": "Valid"}

import uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)