import axios from "axios";
import { useState } from "react";

interface HeaderProps {
  onRefresh: () => void;
  newsCount: number;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, newsCount }) => {
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const handleRefresh = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/refresh`);
      setLastUpdate(new Date().toLocaleTimeString("it-IT"));
      onRefresh(); // ricarica la mappa
    } catch (err) {
      console.error("Errore durante l'aggiornamento:", err);
    }
  };

  return (
    <header
      style={{
        backgroundColor: "#222",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>🌍 NewsMap</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Mostra contatore e ora */}
        <span style={{ color: "#aaa", fontSize: "0.9rem" }}>
          📰 {newsCount} notizie attive
          {lastUpdate && (
            <>
              {" | "}
              Ultimo aggiornamento: {lastUpdate}
            </>
          )}
        </span>

        <button
          onClick={handleRefresh}
          style={{
            backgroundColor: "#1E90FF",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔄 Aggiorna notizie
        </button>
      </div>
    </header>
  );
};

export default Header;
