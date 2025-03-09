from databases import Database
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import class_mapper


DATABASE_URL = "sqlite:///./test.db"  # Use PostgreSQL or MySQL in production

database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

Base.metadata.create_all(bind=engine)

def object_to_dict(obj):
    """
    Converts a SQLAlchemy object to a dictionary.
    """
    return {column.name: getattr(obj, column.name) for column in class_mapper(obj.__class__).columns}