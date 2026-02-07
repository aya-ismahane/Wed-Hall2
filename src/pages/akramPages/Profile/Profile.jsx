import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, role } = useAuth();

  if (!user) {
    return <div className="profile-container">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt="Profile"
            className="profile-pfp"
          />
          <h2>{user.full_name || user.fullName}</h2>
          <span className="role-badge">{role}</span>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <p>{user.phone || 'Not provided'}</p>
          </div>
          <div className="info-item">
            <label>Wilaya / City</label>
            <p>{user.wilaya || user.city || 'Not provided'}</p>
          </div>
          <div className="info-item">
            <label>Member Since</label>
            <p>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
