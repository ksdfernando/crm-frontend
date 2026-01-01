import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { format } from 'date-fns';
import '../App.css';

function AllLeads() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const [statusFilter, setStatusFilter] = useState('');
  const [assignedToFilter, setAssignedToFilter] = useState('');

  useEffect(() => {
    api.get('/leads')
      .then(res => {
        setLeads(res.data);
        setFilteredLeads(res.data);
      })
      .catch(err => {
        console.error('Error fetching leads:', err);
        alert('Failed to load leads');
      });
  }, []);

  useEffect(() => {
    let filtered = leads;

    if (statusFilter) {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    if (assignedToFilter) {
      filtered = filtered.filter(lead => String(lead.assigned_to) === String(assignedToFilter));
    }

    setFilteredLeads(filtered);
  }, [statusFilter, assignedToFilter, leads]);

  // Extract unique statuses
  const uniqueStatuses = [...new Set(leads.map(lead => lead.status))].filter(Boolean);

  // Extract unique assigned users with names and IDs
  const uniqueAssignedTo = [
    ...new Map(
      leads
        .filter(lead => lead.assigned_to && lead.assigned_user_name)
        .map(lead => [lead.assigned_to, lead.assigned_user_name])
    )
  ].map(([id, name]) => ({ id, name }));

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📋 All Leads</h2>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Filter by Status</option>
          {uniqueStatuses.map((status, i) => (
            <option key={i} value={status}>{status}</option>
          ))}
        </select>

        <select value={assignedToFilter} onChange={(e) => setAssignedToFilter(e.target.value)}>
          <option value="">Filter by Assigned To</option>
          {uniqueAssignedTo.map((user, i) => (
            <option key={i} value={user.id}>{user.name}</option>
          ))}
        </select>

        {(statusFilter || assignedToFilter) && (
          <button onClick={() => {
            setStatusFilter('');
            setAssignedToFilter('');
          }}>Clear Filters</button>
        )}
      </div>

      {filteredLeads.length === 0 ? (
        <p className="no-leads">📭 No leads found matching the filters.</p>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Customer ID</th>
                <th>Source</th>
                <th>Assigned To</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Interested In</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.lead_id}>
                  <td>{lead.lead_id}</td>
                  <td>{lead.customer_id || '—'}</td>
                  <td>{lead.source || '—'}</td>
                  <td>{lead.assigned_user_name || 'Unassigned'}</td>
                  <td>{lead.created_at ? format(new Date(lead.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a') : '—'}</td>
                  <td>{lead.status || '—'}</td>
                  <td>{lead.interested_in || '—'}</td>
                  <td>{lead.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllLeads;
