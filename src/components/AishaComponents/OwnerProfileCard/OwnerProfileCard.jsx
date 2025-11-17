import React from "react";
import "./OwnerProfileCard.css";
import Rating from "../Rating/Rating.jsx"; 

function OwnerProfileCard({ owner, onEdit }) {
  return (
    <div className="owner-card">
      <img src={owner.picture} alt="Profile" className="owner-img" />
      <Rating rating={owner.rating} readOnly={true} />
      <h3>{owner.fullName}</h3>
      <p>{owner.email}</p>
      <p>{owner.phoneNum}</p>
      <p>{owner.wilaya}</p>
      <button className="edit-btn" onClick={onEdit}>Edit Profile</button>
    </div>
  );
}

export default OwnerProfileCard;
