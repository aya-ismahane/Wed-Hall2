import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Topbar.css'; // Assume CSS exists or is optional

const Topbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="topbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#333', color: '#fff' }}>
            <div className="logo">
                <h2>Wedding Halls</h2>
            </div>
            <div className="nav-links">
                <Link to="/profile" style={{ color: '#fff', marginRight: '15px' }}>Profile</Link>
                <Link to="/requests" style={{ color: '#fff', marginRight: '15px' }}>Requests</Link>
                <Link to="/history" style={{ color: '#fff', marginRight: '15px' }}>History</Link>
                <button onClick={handleLogout} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
            </div>
        </div>
    );
};

export default Topbar;
