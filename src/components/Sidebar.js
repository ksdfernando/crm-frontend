import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';

function Sidebar() {
  const [userName, setUserName] = useState("Guest");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login state
    
    localStorage.setItem('isLoggedIn', 'false');
     console.log(localStorage.getItem("isLoggedIn"));
     navigate('/login');
     window.location.reload();  
    Cookies.remove('token'); // if using token cookie
    
  };

  return (
    <div className="sidebar">
      <h2>Welcome, {userName}</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/add_users">Add Users</Link></li>
        <li><Link to="/add_customers">Add customers</Link></li>
        <li><Link to="/Create_leads">Create Leads</Link></li>
          <li><Link to="/My_leads">MY Leads</Link> </li>
        <li><Link to="/User">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
