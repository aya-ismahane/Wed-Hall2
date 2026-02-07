// src/pages/RequestsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";

function RequestsPage() {
  const { user, API_BASE } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmReject, setConfirmReject] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRequests = useCallback(async () => {
    if (!user?.id || !API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/aishaWork/ownerRequests.php?owner_id=${user.id}`, { credentials: "include" });
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.requests)) {
        setRequests(data.requests);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, API_BASE]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAccept = async (req) => {
    if (!user?.id || !API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/aishaWork/ownerRequestAccept.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ owner_id: user.id, request_id: req.id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setRequests((prev) => prev.filter((r) => r.id !== req.id));
      }
    } catch (err) {
      console.error("Accept failed", err);
    }
  };

  const handleReject = async (requestId) => {
    if (!user?.id || !API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/aishaWork/ownerRequestReject.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ owner_id: user.id, request_id: requestId }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
      }
    } catch (err) {
      console.error("Reject failed", err);
    }
    setConfirmReject(null);
  };

  const confirmRejection = (confirm) => {
    if (confirm && confirmReject) handleReject(confirmReject.id);
    else setConfirmReject(null);
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (!sortField) return 0;
    const valA = (a[sortField] ?? "").toString().toLowerCase();
    const valB = (b[sortField] ?? "").toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRequests = sortedRequests.filter((req) =>
    Object.values(req)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="app-container">
        <div className="dashboard requests-history">
          <p className="empty-msg">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="dashboard requests-history">
        <div className="table-section">
          <div className="table-header">
            <h3>Pending Requests</h3>
            <input
              type="text"
              className="search-bar"
              placeholder="Search by client, hall, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredRequests.length === 0 ? (
            <p className="empty-msg">No requests found.</p>
          ) : (
            <div className="table-wrapper">
              <table className="styled-table">
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.client}</td>
                      <td>{req.hall}</td>
                      <td>{req.phone}</td>
                      <td>
                        {req.from} → {req.to}
                      </td>
                      <td className="action-buttons">
                        <button className="accept" onClick={() => handleAccept(req)}></button>
                        <button className="reject" onClick={() => setConfirmReject(req)}></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {confirmReject && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <h4>Reject Request</h4>
              <p>
                Reject request from <strong>{confirmReject.client}</strong>?
              </p>
              <div className="confirm-buttons">
                <button className="yes" onClick={() => confirmRejection(true)}>Yes</button>
                <button className="no" onClick={() => confirmRejection(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestsPage;
