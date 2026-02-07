import React, { useState } from "react";

const AddHallPopup = ({ onClose, onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagesStr, setImagesStr] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    if (!n) {
      setError("Hall name is required");
      return;
    }
    const images = imagesStr.trim() ? imagesStr.trim().split(/\s+/).filter(Boolean) : [];
    onSubmit({
      name: n,
      price: price.trim() ? Number(price) : 0,
      description: description.trim(),
      images,
      lat: lat.trim() ? Number(lat) : 0,
      lng: lng.trim() ? Number(lng) : 0,
    });
  };

  return (
    <div
      className="popup-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "440px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Add Hall</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
              placeholder="Hall name"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Price (DZD)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
              placeholder="0"
              min="0"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px", minHeight: "80px" }}
              placeholder="Brief description"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Image URLs (one per line or space-separated)</label>
            <textarea
              value={imagesStr}
              onChange={(e) => setImagesStr(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px", minHeight: "60px" }}
              placeholder="https://..."
            />
          </div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <div style={{ flex: 1 }}>
              <label>Latitude</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                placeholder="e.g. 36.75"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Longitude</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                placeholder="e.g. 3.05"
              />
            </div>
          </div>
          {error && <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <button type="button" onClick={onClose} style={{ padding: "8px 16px" }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              {loading ? "Adding..." : "Add Hall"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHallPopup;
