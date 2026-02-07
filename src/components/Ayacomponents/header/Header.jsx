import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./header.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${sidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <header className="header">
        {/* Hamburger icon */}
        <div className="hamburger" onClick={toggleSidebar}>
          <Icon
            icon={sidebarOpen ? "mdi:close" : "mdi:menu"}
            width="28"
            height="28"
            color="white"
          />
        </div>

        {/* Logo */}
        <Link to="/landingpage" className="logo">
          Wed Hall
        </Link>

        {/* Desktop Navbar */}
        <nav className="navbar">
          <a href="/landingpage">Home</a>
          <a href="/explore">Explore Halls</a>
          {user ? (
            <>
              <a href="/mybooking">My Bookings</a>
              <a href="/profile" className="profile-link">
                <Icon icon="mdi:account-circle" width="22" height="22" />
                <span>{user.full_name || user.fullName}</span>
              </a>
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/Signupch">Sign up</a>
              <a href="/login">Log in</a>
            </>
          )}
          <a href="/landingpage#aboutus">About us</a>
        </nav>

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
          <a href="/landingpage" onClick={toggleSidebar}>Home</a>
          <a href="/explore" onClick={toggleSidebar}>Explore Halls</a>
          {user ? (
            <>
              <a href="/mybooking" className="sidebar-link" onClick={toggleSidebar}>
                <Icon icon="mdi:account-circle" width="20" height="20" />
                Profile ({user.full_name || user.fullName})
              </a>
              <button type="button" className="sidebar-link logout-sidebar" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/Signupch" onClick={toggleSidebar}>Sign in</a>
              <a href="/login" onClick={toggleSidebar}>Log in</a>
            </>
          )}
          <a href="/landingpage#aboutus" onClick={toggleSidebar}>
            About us
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
