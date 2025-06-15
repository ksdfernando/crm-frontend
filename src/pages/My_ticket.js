import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '../App.css';

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/check')
      .then(res => {
        const currentUser = res.data.user;
        if (!currentUser) {
          alert("Not logged in");
          return;
        }

        setUser(currentUser);
        return api.get(`/tickets/my-tickets/${currentUser.user_id}`);
      })
      .then(res => {
        if (res && res.data) {
          setTickets(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching tickets:", err);
      });
  }, []);

  const handleTicketClick = (ticket) => {
    navigate(`/ticket_details/${ticket.ticket_id}`, { state: { ticket } });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">🎫 My Assigned Tickets</h2>

      {tickets.length === 0 ? (
        <p className="no-leads">🚫 No tickets assigned to you.</p>
      ) : (
        <div className="lead-grid">
          {tickets.map(ticket => (
            <button
              key={ticket.ticket_id}
              className="lead-card"
              onClick={() => handleTicketClick(ticket)}
            >
              <div>
                <h3>🧾 Ticket ID: {ticket.ticket_id}</h3>
                <p><strong>Subject:</strong> {ticket.subject}</p>
                {/* <p><strong>Description:</strong> {ticket.description}</p> */}
                <p><strong>Status:</strong> <span className="status">{ticket.status}</span></p>
                <p><strong>Priority:</strong> <span className="priority">{ticket.priority}</span></p>
                 <p><strong>Update:</strong> <span className="update">{ticket.update_note}</span></p>
                <p>
                  <strong>Created At:</strong>{' '}
                  {format(new Date(ticket.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}
                </p>
                <hr />
                <p><strong>Customer Name:</strong> {ticket.name}</p>
                <p><strong>Customer Email:</strong> {ticket.email}</p>
                <p><strong>Customer Phone:</strong> {ticket.phone}</p>
                
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTickets;
