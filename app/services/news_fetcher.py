import requests
from app.db import get_connection
from datetime import datetime
import os
import time

# Ottieni le chiavi API da variabili d’ambiente
NEWS_API_KEY = os.getenv("NEWS_API_KEY")
GEOAPIFY_API_KEY = os.getenv("GEOAPIFY_API_KEY")

NEWS_URL = "https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey={key}"

def fetch_top_news():
    """Scarica le top news dal mondo usando NewsAPI."""
    if not NEWS_API_KEY:
        print("X Nessuna chiave NEWS_API_KEY impostata.")
        return []

    print("2- o.O Scaricamento notizie da NewsAPI...")
    resp = requests.get(NEWS_URL.format(key=NEWS_API_KEY))
    if resp.status_code != 200:
        print("@_@ Errore NewsAPI:", resp.status_code, resp.text)
        return []

    data = resp.json()
    articles = data.get("articles", [])
    print(f"3-Trovate {len(articles)} notizie.")
    return articles


def geocode_location(location_name):
    """Geocodifica un luogo con Geoapify (ritorna lat/lon o None)."""
    if not location_name or not GEOAPIFY_API_KEY:
        return None

    url = f"https://api.geoapify.com/v1/geocode/search?text={location_name}&format=json&apiKey={GEOAPIFY_API_KEY}"
    try:
        resp = requests.get(url)
        if resp.status_code != 200:
            return None
        results = resp.json().get("results", [])
        if not results:
            return None
        loc = results[0]
        return {"lat": loc["lat"], "lon": loc["lon"]}
    except Exception as e:
        print("Errore durante la geocodifica:", e)
        return None


def save_news_to_db(news_list):
    """Salva le notizie nel database, evitando duplicati."""
    conn = get_connection()
    cur = conn.cursor()

    for article in news_list:
        title = article.get("title")
        url = article.get("url")
        image = article.get("urlToImage")
        source = article.get("source", {}).get("name")
        published_at = article.get("publishedAt")

        if not title or not url:
            continue

        # Evita duplicati (stesso URL)
        cur.execute("SELECT id FROM news WHERE url = ?", (url,))
        if cur.fetchone():
            continue

        # Tenta di estrarre un luogo plausibile dal nome della fonte
        possible_location = source or title.split(" ")[-1]
        coords = geocode_location(possible_location)
        lat, lon = (coords["lat"], coords["lon"]) if coords else (None, None)

        cur.execute("""
            INSERT INTO news (title, url, image, source, lat, lon, published_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (title, url, image, source, lat, lon, published_at, datetime.utcnow().isoformat()))

        # Sleep per non saturare Geoapify free tier
        time.sleep(1)

    conn.commit()
    conn.close()
    print("4-Notizie salvate nel database.")


def update_news():
    """Pipeline completa: scarica, geocodifica e salva."""
    articles = fetch_top_news()
    if articles:
        save_news_to_db(articles)
