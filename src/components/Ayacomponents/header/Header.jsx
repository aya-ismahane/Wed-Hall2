import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./header.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
        <a href="/" className="logo">
          Wed Hall
        </a>

        {/* Desktop Navbar */}
        <nav className="navbar">
          <a href="/landingpage">Home</a>
          <a href="/Signupch">Sign in</a>
          <a href="/login">Log in</a>
          <a href="/landingpage#aboutus">About us</a>
        </nav>

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
          <a href="/landingpage">Home</a>
          <a href="/Signupch">Sign in</a>
          <a href="/login">Log in</a>
          <a href="/landingpage#aboutus" onClick={toggleSidebar}>
            About us
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
