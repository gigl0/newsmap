from fastapi import APIRouter
from app.db import get_connection
from app.models import News

router = APIRouter()

@router.get("/news", response_model=list[News])
def get_news():
    """Restituisce tutte le notizie dal database."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM news ORDER BY created_at DESC")
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]
