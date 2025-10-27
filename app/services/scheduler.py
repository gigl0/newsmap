from apscheduler.schedulers.background import BackgroundScheduler
from app.services.news_fetcher import update_news
import atexit

def start_scheduler():
    """Avvia il job scheduler che aggiorna le notizie ogni ora."""
    scheduler = BackgroundScheduler()
    
    # Esegui ogni 60 minuti
    scheduler.add_job(update_news, "interval", hours=1, id="update_news_job", replace_existing=True)
    
    scheduler.start()
    print("5- #_# Scheduler avviato: aggiorna le notizie ogni ora.")

    # Ferma il job in modo pulito alla chiusura dell'app
    atexit.register(lambda: scheduler.shutdown())
