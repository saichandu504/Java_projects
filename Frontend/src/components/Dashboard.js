import { useEffect, useState } from "react";
import "./Dashboard.css"; // We'll add CSS for the search bar

function Dashboard() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="dashboard-body" style={{ marginTop: "120px", textAlign: "center" }}>
      {/* Full-width search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        className="dashboard-search"
      />
      <h2 className="coming-soon">Coming Soon</h2>
    </div>
  );
}

export default Dashboard;
