// src/pages/RequestsPage.jsx
import React, { useState } from "react";
import Topbar from "../../components/AishaComponents/Topbar/Topbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faTimesCircle, faSort } from "@fortawesome/free-solid-svg-icons";
import { useRequests } from "../../context/RequestsProvider";

function RequestsPage({ owner }) {
  const { requests, handleAccept, handleReject } = useRequests();
  const [confirmReject, setConfirmReject] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const confirmRejection = (confirm) => {
    if (confirm && confirmReject) handleReject(confirmReject.id);
    setConfirmReject(null);
  };

  // Sort logic
  const sortedRequests = [...requests].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField].toString().toLowerCase();
    const valB = b[sortField].toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Search filter
  const filteredRequests = sortedRequests.filter((req) =>
    Object.values(req)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="app-container">
      <Topbar owner={owner} />
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
                {/* <thead>
                  <tr>
                    <th onClick={() => handleSort("client")}>
                      Client
                      <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th onClick={() => handleSort("hall")}>
                      Hall <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th onClick={() => handleSort("phone")}>
                      Phone <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th>Period</th>
                    <th>Actions</th>
                  </tr>
                </thead> */}
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
                        <button className="accept" onClick={() => handleAccept(req)}>
                          {/* <FontAwesomeIcon icon={faCheckCircle} /> */}
                        </button>
                        <button className="reject" onClick={() => setConfirmReject(req)}>
                          {/* <FontAwesomeIcon icon={faTimesCircle} /> */}
                        </button>
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
                <button className="yes" onClick={() => confirmRejection(true)}>
                  Yes
                </button>
                <button className="no" onClick={() => confirmRejection(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestsPage;
