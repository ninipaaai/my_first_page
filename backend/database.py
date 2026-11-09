from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from pathlib import Path

SQL_DB_URL = f"sqlite:///{Path(__file__).parent / 'comments.db'}"
engine = create_engine(SQL_DB_URL, connect_args={"check_same_thread": False})

session_local = sessionmaker(autoflush=False, autocommit=False, bind=engine)
Base = declarative_base()