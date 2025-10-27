from fastapi import FastAPI
from app.routers import news_router
from app.db import init_db

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
