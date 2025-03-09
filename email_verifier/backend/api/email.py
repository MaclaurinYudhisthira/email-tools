import random

import resend

resend.api_key = "re_FRFbR6Ck_EGfwqv1zpmU95TgzSYfGtLhA"


def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(email: str, otp: int):
    payload = {
        "from": "support@verifyemail.in",
        "to": f"{email}",
        "subject": "Hello World",
        "html": f"<p>Here is your OTP to <strong>{otp}</strong>!</p>",
    }

    # r = resend.Emails.send(payload)
    print(f"Sending OTP {otp} to {email}")  # Replace this with actual email sending
