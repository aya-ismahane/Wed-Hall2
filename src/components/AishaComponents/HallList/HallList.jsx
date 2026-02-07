import React, { useState } from "react";
import AddHallPopup from "./AddHallPopup.jsx";
import EditHallPopup from "./EditHallPopup.jsx";

const HallList = ({ halls, API_BASE, ownerId, refreshHalls }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [editingHall, setEditingHall] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddHall = async (data) => {
    if (!API_BASE) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/aishaWork/ownerAddHall.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.status === "success") {
        setShowAdd(false);
        if (refreshHalls) refreshHalls();
      } else {
        alert(result.error || "Failed to add hall");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add hall");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHall = async (data) => {
    if (!API_BASE || !ownerId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/aishaWork/ownerUpdateHall.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          hall_id: data.hall_id,
          owner_id: ownerId,
          name: data.name,
          price: data.price,
          description: data.description,
        }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setEditingHall(null);
        if (refreshHalls) refreshHalls();
      } else {
        alert(result.error || "Failed to update hall");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update hall");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHall = async (hall) => {
    if (!API_BASE || !ownerId) return;
    if (!window.confirm(`Delete hall "${hall.name}"?`)) return;
    setDeletingId(hall.id);
    try {
      const res = await fetch(`${API_BASE}/aishaWork/ownerDeleteHall.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ hall_id: hall.id, owner_id: ownerId }),
      });
      const result = await res.json();
      if (result.status === "success") {
        if (refreshHalls) refreshHalls();
      } else {
        alert(result.error || "Failed to delete hall");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete hall");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
        <h4 style={{ margin: 0 }}>My Halls</h4>
        {API_BASE && ownerId && (
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            style={{ padding: "8px 16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            + Add Hall
          </button>
        )}
      </div>
      <div className="hall-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "0" }}>
        {halls.map((hall) => (
          <div
            key={hall.id}
            className="hall-card"
            style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", position: "relative" }}
          >
            <img
              src={hall.image || hall.images?.[0] || "https://via.placeholder.com/300"}
              alt={hall.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h4 style={{ margin: "0 0 8px" }}>{hall.name}</h4>
              <p style={{ margin: "4px 0", fontSize: "14px" }}>{hall.location || "—"}</p>
              <p style={{ margin: "4px 0", fontSize: "14px" }}>{hall.price != null ? `${Number(hall.price).toLocaleString()} DZD` : "—"}</p>
              <p style={{ margin: "4px 0", fontSize: "14px" }}>Rating: {hall.rating != null ? hall.rating : "—"} ★</p>
            </div>
            {API_BASE && ownerId && (
              <div style={{ padding: "8px 15px 15px", display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setEditingHall(hall)}
                  style={{ padding: "6px 12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteHall(hall)}
                  disabled={deletingId === hall.id}
                  style={{ padding: "6px 12px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
                >
                  {deletingId === hall.id ? "..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAdd && (
        <AddHallPopup
          onClose={() => setShowAdd(false)}
          onSubmit={handleAddHall}
          loading={loading}
        />
      )}
      {editingHall && (
        <EditHallPopup
          hall={editingHall}
          onClose={() => setEditingHall(null)}
          onSubmit={handleUpdateHall}
          loading={loading}
        />
      )}
    </div>
  );
};

export default HallList;
