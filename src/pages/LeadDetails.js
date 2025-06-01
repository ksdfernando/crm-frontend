import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import { format } from 'date-fns';
import '../App.css';

function LeadDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const lead = location.state?.lead;

  const [status, setStatus] = useState(lead?.status || 'new');
  const [notes, setNotes] = useState(lead?.notes || '');

  if (!lead) {
    return (
      <div className="dashboard-container">
        <h2>Lead Details</h2>
        <p>❌ No lead data available. Please go back to <button onClick={() => navigate(-1)}>My Leads</button>.</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await api.put(`/leads/update/${lead.lead_id}`, {
        status,
        notes,
      });
      alert("✅ Lead updated successfully!");
      navigate(-1)
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("❌ Failed to update lead.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📄 Lead Details</h2>
      <div className="lead-details-card">
        <p><strong>Lead ID:</strong> {lead.lead_id}</p>
        <p><strong>Name:</strong> {lead.name}</p>
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Phone:</strong> {lead.phone}</p>
        <p><strong>Interested In:</strong> {lead.interested_in}</p>
        <p>
            <strong>Created At:</strong>{' '}
            {format(new Date(lead.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}
        </p>
        <label><strong>Status:</strong>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="interested">Interested</option>
            <option value="converted">Converted</option>
          </select>
        </label>

        <label><strong>Notes:</strong>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows="5"
            placeholder="Add any notes about this lead..."
          />
        </label>

        <div className="button-group">
          
          <button onClick={() => navigate(-1)} className="back-button">🔙 Back</button>

          <button onClick={handleSave} className="save-button">💾 Save</button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
