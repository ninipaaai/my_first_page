from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas import CommentCreate, CommentRead
from models import Comments, Base
from database import engine, session_local
from pathlib import Path
from fastapi.staticfiles import StaticFiles

app = FastAPI()
Base.metadata.create_all(bind=engine)

def get_db(): #Общение с базой данных
    db = session_local()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/comments", response_model=list[CommentRead])
async def list_comments(db: Session=Depends(get_db)): #Чтение всех предыдух комментариев
    return db.query(Comments).all()

@app.post("/api/comments", response_model=CommentRead, status_code=201)
async def create_comment(comm: CommentCreate, db: Session=Depends(get_db)):
    new_comment = Comments(name=comm.name, text=comm.text)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@app.delete("/api/comments/{comment_id}", status_code=204)
async def delete_comment(comment_id: int, db: Session=Depends(get_db)) -> None:
    comment = db.get(Comments, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Комментарий не найден")
    db.delete(comment)
    db.commit()
    
dist_dir = Path(__file__).parent.parent / "dist"
if dist_dir.is_dir():
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="static")



