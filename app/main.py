from dotenv import load_dotenv
load_dotenv()  # carica le variabili da .env
from fastapi import FastAPI
from app.routers import news_router
from app.db import init_db
from app.services.news_fetcher import update_news
from app.services.scheduler import start_scheduler

app = FastAPI(
    title="NewsMap API",
    description="API backend that aggregates global news and displays them on a map using Geoapify.",
    version="0.1.0",
)

# Initialize database
init_db()

# Include news routes
app.include_router(news_router.router, prefix="/api", tags=["News"])

@app.get("/")
def root():
    return {"message": "Welcome to NewsMap API!"}

@app.on_event("startup")
def startup_event():
    print("1-Avvio applicazione... aggiornamento iniziale notizie.")
    update_news()
    start_scheduler()
