from fastapi import APIRouter
from app.db import get_connection
from app.models import News
from app.services.news_fetcher import update_news

router = APIRouter()

@router.get("/news", response_model=list[News])
def get_news():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM news ORDER BY created_at DESC")
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@router.post("/refresh")
def refresh_news():
    update_news()
    return {"status": "ok", "message": "News updated successfully"}
