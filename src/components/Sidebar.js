import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const hoverTimer = useRef(null);

  // Clear any existing hover timer
  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  // Start timer to open dropdown after 2 seconds of hover
  const handleMouseEnter = (section) => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => {
      setOpenSection(section);
    }, 80); // 2000ms = 2 seconds
  };

  // Clear timer and optionally close dropdown on mouse leave
  const handleMouseLeave = () => {
    clearHoverTimer();
    // Optional: uncomment next line to close dropdown when mouse leaves
    // setOpenSection(null);
  };

  // Also allow toggling on click as before
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    Cookies.remove('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="sidebar">
      {/* <h2>CRM Dashboard</h2> */}

      <div
        className="sidebar-section"
        onClick={() => toggleSection('users')}
        onMouseEnter={() => handleMouseEnter('users')}
        onMouseLeave={handleMouseLeave}
      >
        Users <span className={`arrow ${openSection === 'users' ? 'open' : ''}`}></span>
      </div>
      {openSection === 'users' && (
        <ul className="sidebar-group">
          <li><Link to="/add_users">Add Users</Link></li>
          <li><Link to="/User">Profile</Link></li>
        </ul>
      )}

      <div
        className="sidebar-section"
        onClick={() => toggleSection('customers')}
        onMouseEnter={() => handleMouseEnter('customers')}
        onMouseLeave={handleMouseLeave}
      >
        Customers <span className={`arrow ${openSection === 'customers' ? 'open' : ''}`}></span>
      </div>
      {openSection === 'customers' && (
        <ul className="sidebar-group">
          <li><Link to="/add_customers">Add Customers</Link></li>
          <li><Link to="/view_customers">View Customers</Link></li>
        </ul>
      )}

      <div
        className="sidebar-section"
        onClick={() => toggleSection('leads')}
        onMouseEnter={() => handleMouseEnter('leads')}
        onMouseLeave={handleMouseLeave}
      >
        Leads <span className={`arrow ${openSection === 'leads' ? 'open' : ''}`}></span>
      </div>
      {openSection === 'leads' && (
        <ul className="sidebar-group">
          <li><Link to="/Create_leads">Create Leads</Link></li>
          <li><Link to="/My_leads">My Leads</Link></li>
        </ul>
      )}

      <div
        className="sidebar-section"
        onClick={() => toggleSection('tickets')}
        onMouseEnter={() => handleMouseEnter('tickets')}
        onMouseLeave={handleMouseLeave}
      >
        Tickets <span className={`arrow ${openSection === 'tickets' ? 'open' : ''}`}></span>
      </div>
      {openSection === 'tickets' && (
        <ul className="sidebar-group">
          <li><Link to="/create_ticket">Create Ticket</Link></li>
          <li><Link to="/My_ticket">My Ticket</Link></li>
        </ul>
      )}

      <div
        className="sidebar-section"
        onClick={() => toggleSection('settings')}
        onMouseEnter={() => handleMouseEnter('settings')}
        onMouseLeave={handleMouseLeave}
      >
        Settings <span className={`arrow ${openSection === 'settings' ? 'open' : ''}`}></span>
      </div>
      {openSection === 'settings' && (
        <ul className="sidebar-group">
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
