import React, { useState } from "react";
import "./ProfilePopup.css";

function ProfilePopup({ owner, setOwner, onClose }) {
  const [tempOwner, setTempOwner] = useState(owner);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation
    if (name === "phoneNum") {
      if (!/^\d*$/.test(value)) return; // only digits allowed
    }

    setTempOwner({ ...tempOwner, [name]: value });
  };

  const handleSave = () => {
    const newErrors = {};
    if (!tempOwner.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!/^\d{8,}$/.test(tempOwner.phoneNum))
      newErrors.phoneNum = "Phone number must contain only digits (min 8).";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOwner(tempOwner);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempOwner({ ...tempOwner, picture: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit Profile</h2>

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={tempOwner.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={tempOwner.email}
          onChange={handleChange}
          placeholder="example@email.com"
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNum"
          value={tempOwner.phoneNum}
          onChange={handleChange}
          placeholder="Digits only"
          maxLength="10"
        />
        {errors.phoneNum && <p className="error">{errors.phoneNum}</p>}

        <label>Wilaya</label>
        <input
          type="text"
          name="wilaya"
          value={tempOwner.wilaya}
          onChange={handleChange}
        />

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="popup-buttons">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
