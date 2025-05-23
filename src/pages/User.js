// src/pages/User.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import '../App.css';

function User() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    api.get('/auth/check') 
      .then(res => {
        if (res.data.user) {
          setUserData(res.data.user);
        } else {
          alert("Not logged in");
        }
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        alert("Error fetching user");
      });
  }, []);

  return (
    
    <div>
      <div> <Sidebar/></div>
     <div className="user-dashboard">
      <h2>User Dashboard</h2>
      
      {userData ? (
        <div className="user-data">
          <p><strong>ID:</strong> {userData.user_id}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
      </div>
    </div>
  );
}

export default User;
