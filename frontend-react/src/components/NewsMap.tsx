import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { fetchNews, News } from "../api/news";

interface NewsMapProps {
  refreshTrigger: number;
}

const NewsMap: React.FC<NewsMapProps> = ({ refreshTrigger }) => {
  const [news, setNews] = useState<News[]>([]);

  const loadNews = async () => {
    const data = await fetchNews();
    setNews(data);
  };

  useEffect(() => {
    loadNews();
  }, [refreshTrigger]); // si aggiorna quando refreshTrigger cambia

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "calc(100vh - 60px)", width: "100%" }}
    >
      <TileLayer
        url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {news
        .filter((n) => n.lat && n.lon)
        .map((n) => (
          <Marker
            key={n.id}
            position={[n.lat!, n.lon!] as [number, number]}
            icon={defaultIcon as Icon}
          >
            <Popup>
              <div style={{ textAlign: "center", maxWidth: "220px" }}>
                {n.image && (
                  <img
                    src={n.image}
                    alt={n.title}
                    style={{
                      width: "200px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                )}

                <strong>{n.title}</strong>
                <br />
                {n.source && <em>{n.source}</em>}
                <br />

                {/* 🕓 Aggiunta ora di pubblicazione */}
                {n.published_at && (
                  <small style={{ color: "gray" }}>
                    🕓 {new Date(n.published_at).toLocaleString("it-IT")}
                  </small>
                )}
                <br />

                <a href={n.url} target="_blank" rel="noreferrer">
                  Leggi di più
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default NewsMap;
