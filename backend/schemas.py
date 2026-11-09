from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

#Аннотации
class CommentCreate(BaseModel):
    name: str = Field(min_length=1, max_length=60, description="Имя автора")
    text: str = Field(min_length=1, max_length=1000, description="Текст комментария")

class CommentRead(CommentCreate):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)