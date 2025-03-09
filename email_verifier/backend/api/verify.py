import os
import re
import smtplib

import dns.resolver
import pandas as pd
from utils.constant import PROCESSED_FOLDER
from utils.tools import generate_unique_string


def validate_email_format(email):
    """Check if the email has a valid format."""
    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(email_regex, email) is not None


def check_domain_type(domain):
    """Check if the domain is disposable or professional."""
    # List of disposable email domains for basic checks
    disposable_domains = ["mailinator.com", "tempmail.com", "guerrillamail.com"]
    if domain in disposable_domains:
        return "Disposable"
    # Add more logic or integrate with an API for a detailed domain type check
    return "Professional"


def get_mx_records(domain):
    """Check if MX records exist for the domain."""
    try:
        mx_records = dns.resolver.resolve(domain, "MX")
        return [str(record.exchange) for record in mx_records]
    except dns.resolver.NoAnswer:
        return []
    except Exception as e:
        print(f"Error fetching MX records: {e}")
        return []


def check_smtp_server(mx_records, email):
    """Check if the SMTP server accepts the email."""
    for mx in mx_records:
        try:
            smtp = smtplib.SMTP(mx, timeout=1)
            smtp.set_debuglevel(0)  # Set to 1 for debugging output
            smtp.helo()
            smtp.mail("test@example.com")
            code, message = smtp.rcpt(email)
            smtp.quit()
            if code == 250:  # Email accepted
                return True
        except Exception as e:
            print(f"Error connecting to SMTP server {mx}: {e}")
    return False


def classify_email(email, domain, mx_records):
    """Classify the email as safe, risky, or spam."""
    # Simplistic checks for demonstration
    if any(disposable in domain for disposable in ["tempmail", "mailinator"]):
        return "Spam"
    if not mx_records:
        return "Risky"
    return "Safe"


def validate_email(email):
    """Main function to validate the email."""
    print(f"Validating email: {email}")

    # Step 1: Format validation
    if not validate_email_format(email):
        return "Invalid format"

    # Step 2: Extract domain and check type
    domain = email.split("@")[-1]
    domain_type = check_domain_type(domain)
    print(f"Domain type: {domain_type}")

    # Step 3: Check MX records
    mx_records = get_mx_records(domain)
    if not mx_records:
        return "Invalid - No MX records"
    print(f"MX records found: {mx_records}")

    # # Step 4: Check SMTP server and email deliverability
    # is_deliverable = check_smtp_server(mx_records, email)
    # if not is_deliverable:
    #     return "Invalid - Email not deliverable"

    # Step 5: Classification
    classification = classify_email(email, domain, mx_records)
    print(f"Email classification: {classification}")

    return f"Valid ({classification})"


def process_file(file_path: str) -> str:

    df = pd.read_csv(file_path) if file_path.endswith(".csv") else pd.read_excel(file_path)

    # Sample Processing: Add a new column
    if "email" in df.columns:
        df["result"] = df["email"].apply(validate_email)  # Apply function to each email
    else:
        df["result"] = "No email column found"

    processed_filename = f"processed_{generate_unique_string()}_" + os.path.basename(file_path)
    processed_file_path = os.path.join(PROCESSED_FOLDER, processed_filename)

    # Save processed file
    if file_path.endswith(".csv"):
        df.to_csv(processed_file_path, index=False)
    else:
        df.to_excel(processed_file_path, index=False)

    return os.path.abspath(processed_file_path), processed_filename
