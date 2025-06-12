import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import { format } from 'date-fns';
import '../App.css';

function TicketDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;

  const [status, setStatus] = useState(ticket?.status || 'open');
  const [priority, setPriority] = useState(ticket?.priority || 'medium');

  if (!ticket) {
    return (
      <div className="dashboard-container">
        <h2>Ticket Details</h2>
        <p>❌ No ticket data available. Please go back to <button onClick={() => navigate(-1)}>My Tickets</button>.</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await api.put(`/tickets/update/${ticket.ticket_id}`, {
        status,
        priority
      });
      alert("✅ Ticket updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("❌ Failed to update ticket.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📩 Ticket Details</h2>
      <div className="lead-details-card">
        <p><strong>Ticket ID:</strong> {ticket.ticket_id}</p>
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Created At:</strong> {format(new Date(ticket.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}</p>

        <hr />

        <h3>👤 Customer Info</h3>
        <p><strong>Name:</strong> {ticket.name}</p>
        <p><strong>Email:</strong> {ticket.email}</p>
        <p><strong>Phone:</strong> {ticket.phone}</p>

        <label><strong>Status:</strong>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </label>

        <label><strong>Priority:</strong>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>

        <div className="button-group">
          <button onClick={() => navigate(-1)} className="back-button">🔙 Back</button>
          <button onClick={handleSave} className="save-button">💾 Save</button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
