# 🌍 NewsMap Backend

Backend FastAPI che raccoglie notizie globali, le geocodifica con **Geoapify** e le mostra sulla mappa tramite frontend React.

### Tecnologie
- **FastAPI** per API REST
- **SQLite** per la cache locale
- **Geoapify API** per lat/lon
- **NewsAPI** per le notizie globali
- **APScheduler** per aggiornamenti periodici

### Esecuzione
```bash
uvicorn app.main:app --reload

### Scheduler automatico
Il backend aggiorna le notizie automaticamente ogni ora grazie ad **APScheduler**.
All’avvio:
1. Esegue subito un aggiornamento iniziale.
2. Avvia il job `update_news()` ogni 60 minuti in background.
