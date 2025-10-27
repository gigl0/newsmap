import { useState } from "react";
import Header from "./components/Header";
import NewsMap from "./components/NewsMap";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [newsCount, setNewsCount] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onRefresh={handleRefresh} newsCount={newsCount} />
      <NewsMap
        refreshTrigger={refreshTrigger}
        onCountChange={setNewsCount}
      />
    </div>
  );
}

export default App;
