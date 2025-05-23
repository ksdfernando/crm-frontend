import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';

function Sidebar() {
  const [userName, setUserName] = useState("Guest");
  const navigate = useNavigate();

  

  return (
    <div className="sidebar">
      <h2>Welcome, {userName}</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/add_users">Add Users</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li>
          <button  className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
