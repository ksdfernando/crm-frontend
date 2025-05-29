import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../App.css';

function MyLeads() {
  const [leads, setLeads] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/check')
      .then(res => {
        const currentUser = res.data.user;
        if (!currentUser) {
          alert("Not logged in");
          return;
        }

        setUser(currentUser);

        return api.get(`/leads/my-leads/${currentUser.user_id}`);
      })
      .then(res => {
        if (res && res.data) {
          setLeads(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching leads:", err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📋 My Assigned Leads</h2>
      

      {leads.length === 0 ? (
        <p className="no-leads">🚫 No leads assigned to you.</p>
      ) : (
        <div className="lead-grid">
          {leads.map(lead => (
            <div key={lead.lead_id} className="lead-card">
              <h3>🧾 Lead ID: {lead.lead_id}</h3>
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone}</p>
              <p><strong>Status:</strong> <span className="status">{lead.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLeads;
