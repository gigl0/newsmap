# 🌍 NewsMap Backend

Backend FastAPI che raccoglie notizie globali, le geocodifica con **Geoapify** e le mostra sulla mappa tramite frontend React.

### Tecnologie
- **FastAPI** per API REST
- **SQLite** per la cache locale
- **Geoapify API** per lat/lon
- **NewsAPI** per le notizie globali
- **APScheduler** per aggiornamenti periodici

### ▶️ Esecuzione
```bash
uvicorn app.main:app --reload
