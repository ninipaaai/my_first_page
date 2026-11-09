from sqlalchemy import Column, Integer, String, func, DateTime
from database import Base

#Описание таблицы
class Comments(Base):
    __tablename__="comments"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    text = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)