import React, { useState } from "react";
import "./HallList.css";

function EditHallPopup({ hall, setHalls, onClose }) {
  const [formData, setFormData] = useState({
    name: hall.name,
    location: hall.location,
    price: hall.price.replace(/\D/g, ""), // remove non-numeric for editing
    description: hall.description,
    image: hall.image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      if (!/^\d*$/.test(value)) return; // digits only
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setHalls((prevHalls) =>
      prevHalls.map((h) =>
        h.id === hall.id
          ? { ...h, ...formData, price: `${formData.price} DZD` }
          : h
      )
    );
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Hall</h2>

        <form onSubmit={handleSubmit} className="popup-form">
          <label>Hall Name</label>
          <input name="name" value={formData.name} onChange={handleInputChange} required />

          <label>Location</label>
          <input name="location" value={formData.location} onChange={handleInputChange} required />

          <label>Price (DZD)</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Digits only"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          ></textarea>

          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
            </div>
          )}

          <div className="popup-buttons">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHallPopup;
