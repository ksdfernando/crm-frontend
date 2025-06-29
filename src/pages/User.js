import React, { useEffect, useState } from 'react';
import api from '../services/api';
// import Sidebar from '../components/Sidebar';
import '../App.css';

function User() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    api.get('/auth/check') 
      .then(res => {
        if (res.data.user) {
          setUserData(res.data.user);
          setFormData({ 
            name: res.data.user.name, 
            email: res.data.user.email, 
            password: '' 
          });
        } else {
          alert("Not logged in");
        }
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        alert("Error fetching user");
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    api.put(`/users/${userData.user_id}`, formData)
      .then(res => {
        alert("User updated successfully");
        setUserData({ ...userData, name: formData.name, email: formData.email });
        setEditMode(false);
      })
      .catch(err => {
        console.error("Error updating user:", err);
        alert("Update failed");
      });
  };

  return (
    <div className="user-dashboard">
    

      <h2>User Profile</h2>

      {userData ? (
        <div className="user-data">
          <p><strong>ID:</strong> {userData.user_id}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>

          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit Settings'}
          </button>

          {editMode && (
            <form onSubmit={handleUpdate} className="user-settings-form">
              <h3>User Settings</h3>
              <label>
                Name:
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </label>
              <label>
                Email:
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </label>
              <label>
                  Current Password:
                <input 
                   type="password" 
                   name="currentPassword" 
                   value={formData.currentPassword} 
                   onChange={handleChange} 
                   placeholder="Enter current password" 
                   required
                  />
              </label>
              <label>
                Password:
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="New password (optional)" 
                />
              </label>
              <button type="submit">Save Changes</button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}

export default User;
