import React, { useState } from "react";
// import "../App.css";
import "./EditProfileUser.css";
function ProfilePopup({ owner, setOwner, onClose }) {
  const [tempOwner, setTempOwner] = useState(owner);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempOwner({ ...tempOwner, [name]: value });
  };

  const handleSave = () => {
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
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={tempOwner.fullName}
          onChange={handleChange}
          className="input"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={tempOwner.email}
          onChange={handleChange}
          className="input"
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNum"
          value={tempOwner.phoneNum}
          onChange={handleChange}
          className="input"
        />
        <label>Wilaya:</label>
        <input
          type="text"
          name="wilaya"
          value={tempOwner.wilaya}
          onChange={handleChange}
          className="input"
        />
        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="input" />

        <div className="popup-buttons">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
