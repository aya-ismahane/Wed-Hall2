import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

function Topbar({ owner }) {
  const safeOwner = owner || { fullName: "", picture: "" }; // protect against undefined
  const firstName = safeOwner.fullName?.split(" ")[0] || "";
  const picture = safeOwner.picture || "";

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // redirect to home or login page
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo"><Link to="/">WedHall</Link></div>
        </div>

        <div className="topbar-right">
          <nav className="navbar">
            <div className="nav-item"><Link to="/">Home</Link></div>
            <div className="nav-item"><Link to="/profile">Profile</Link></div>
            <div className="nav-item"><Link to="/requests">Requests</Link></div>
            <div className="nav-item"><Link to="/history">History</Link></div>
            <div className="nav-item logout-btn" onClick={() => setShowLogoutConfirm(true)}>
              Log Out
            </div>
          </nav>

          <div className="user-area">
            <img src={picture} alt="Owner" className="topbar-img" />
            <div className="user-text">
              <h4>{firstName}</h4>
              <p>Owner</p>
            </div>
          </div>
        </div>
      </header>

      {showLogoutConfirm && (
        <div className="logout-overlay">
          <div className="logout-box">
            <h4>Confirm Logout</h4>
            <p>Are you sure you want to log out, <strong>{firstName}</strong>?</p>
            <div className="logout-buttons">
              <button className="yes" onClick={handleLogout}>Yes, Log Out</button>
              <button className="no" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;
