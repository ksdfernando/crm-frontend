import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { format } from 'date-fns';
import '../App.css';

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const [statusFilter, setStatusFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tickets')
      .then(res => {
        setTickets(res.data);
        setFilteredTickets(res.data);
      })
      .catch(err => {
        console.error('Error fetching tickets:', err);
        alert('Failed to load tickets');
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = tickets;

    if (statusFilter) {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (userFilter) {
      filtered = filtered.filter(ticket => String(ticket.assigned_user) === String(userFilter));
    }

    setFilteredTickets(filtered);
  }, [statusFilter, userFilter, tickets]);

  // Get unique users and statuses for dropdowns
  const uniqueUsers = [...new Set(tickets.map(ticket => ticket.assigned_user))].filter(Boolean);
  const uniqueStatuses = [...new Set(tickets.map(ticket => ticket.status))].filter(Boolean);

  // Handle row click
  const handleTicketClick = (ticket) => {
    navigate(`/ticket_details/${ticket.ticket_id}`, { state: { ticket } });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📋 All Tickets</h2>

      {/* Filter Controls */}
      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Filter by Status</option>
          {uniqueStatuses.map((status, index) => (
            <option key={index} value={status}>{status}</option>
          ))}
        </select>

        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
          <option value="">Filter by Assigned User</option>
          {uniqueUsers.map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
        </select>

        {(statusFilter || userFilter) && (
          <button onClick={() => {
            setStatusFilter('');
            setUserFilter('');
          }}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Tickets Table */}
      {filteredTickets.length === 0 ? (
        <p className="no-leads">📭 No tickets match the filters.</p>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Update Note</th>
                <th>Created At</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr
                  key={ticket.ticket_id}
                  onClick={() => handleTicketClick(ticket)}
                  className="clickable-row"
                >
                  <td>{ticket.ticket_id}</td>
                  <td>{ticket.subject}</td>
                  <td><span className="status">{ticket.status}</span></td>
                  <td><span className="priority">{ticket.priority}</span></td>
                  <td>{ticket.assigned_user || 'Unassigned'}</td>
                  <td>{ticket.update_note || '—'}</td>
                  <td>{format(new Date(ticket.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}</td>
                  <td>{ticket.name} | {ticket.email} | {ticket.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTickets;
