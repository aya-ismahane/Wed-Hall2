import React, { useState, useMemo, useEffect, useCallback } from "react";
import "./RequestsHistory.css";
import { useAuth } from "../../context/AuthContext";

function HistoryPage() {
  const { user, API_BASE } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const fetchHistory = useCallback(async () => {
    if (!user?.id || !API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/aishaWork/ownerHistory.php?owner_id=${user.id}`, { credentials: "include" });
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.history)) {
        setHistory(data.history);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, API_BASE]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const filteredHistory = useMemo(() => {
    let data = [...history];
    if (searchTerm.trim() !== "") {
      data = data.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [history, searchTerm, sortConfig]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="dashboard requests-history">
          <p className="empty-msg">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="dashboard requests-history">
        <div className="table-section">
          <div className="table-header">
            <h3>Booking History</h3>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>

          {filteredHistory.length === 0 ? (
            <p className="empty-msg">No history found.</p>
          ) : (
            <div className="table-wrapper">
              <table className="styled-table">
                <tbody>
                  {filteredHistory.map((h) => (
                    <tr key={h.id}>
                      <td>{h.client}</td>
                      <td>{h.hall}</td>
                      <td>
                        {h.from} → {h.to}
                      </td>
                      <td>
                        <span className={`status completed`}>{h.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
