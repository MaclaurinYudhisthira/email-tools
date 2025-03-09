import secrets
import string

def generate_unique_string(length=6):
    characters = string.ascii_letters + string.digits  # Letters and numbers
    return ''.join(secrets.choice(characters) for _ in range(length))

