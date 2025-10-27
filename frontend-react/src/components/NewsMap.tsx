import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { fetchNews, News } from "../api/news";


const NewsMap = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

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
      style={{ height: "100vh", width: "100%" }}
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
            position={[n.lat!, n.lon!]}
            icon={defaultIcon}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
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
                <a href={n.url} target="_blank" rel="noreferrer">
                  Read more
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default NewsMap;
