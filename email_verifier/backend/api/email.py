import random


def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(email: str, otp: str):
    print(f"Sending OTP {otp} to {email}")  # Replace this with actual email sending
