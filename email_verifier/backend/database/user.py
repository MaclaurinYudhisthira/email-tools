from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_verified = Column(Boolean, default=False)
    otp = Column(String, nullable=True)


class ProcessedFile(Base):
    __tablename__ = "processed_files"

    id = Column(Integer, primary_key=True, index=True)
    raw_file_name = Column(String)
    result_file_name = Column(String, unique=True, index=True)
    user_email = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
