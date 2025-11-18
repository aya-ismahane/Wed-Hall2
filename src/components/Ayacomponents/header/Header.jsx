import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './header.css';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>

      <header className="header">
        {/* Hamburger icon */}
        <div className="hamburger" onClick={toggleSidebar}>
          <Icon icon={sidebarOpen ? "mdi:close" : "mdi:menu"} width="28" height="28" color="white" />
        </div>

        {/* Logo */}
        <a href="/" className="logo">Wed Hall</a>

        {/* Desktop Navbar */}
        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#sign-in">Sign in</a>
          <a href="#log-in">Log in</a>
          <a href="#contact">About us</a>
        </nav>

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
          <a href="#home" onClick={toggleSidebar}>Home</a>
          <a href="#sign-in" onClick={toggleSidebar}>Sign in</a>
          <a href="#log-in" onClick={toggleSidebar}>Log in</a>
          <a href="#contact" onClick={toggleSidebar}>About us</a>
        </div>
      </header>
    </>
  );
};

export default Header;
