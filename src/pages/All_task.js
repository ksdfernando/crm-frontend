import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { format } from 'date-fns';
import '../App.css';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [statusFilter, setStatusFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    api.get('/tasks')
      .then(res => {
        setTasks(res.data);
        setFilteredTasks(res.data);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
        alert('Failed to load tasks');
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = tasks;

    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (userFilter) {
      filtered = filtered.filter(task => task.assigned_user === userFilter);
    }

    setFilteredTasks(filtered);
  }, [statusFilter, userFilter, tasks]);

  // Get unique users and statuses for dropdowns
  const uniqueUsers = [...new Set(tasks.map(task => task.assigned_user))].filter(Boolean);
  const uniqueStatuses = [...new Set(tasks.map(task => task.status))].filter(Boolean);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📋 All Tasks</h2>

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

        {/* Clear filters */}
        {(statusFilter || userFilter) && (
          <button onClick={() => {
            setStatusFilter('');
            setUserFilter('');
          }}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Tasks Table */}
      {filteredTasks.length === 0 ? (
        <p className="no-leads">📭 No tasks match the filters.</p>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.task_id}>
                  <td>{task.task_id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{format(new Date(task.due_date), 'dd MMM yyyy')}</td>
                  <td><span className="status">{task.status}</span></td>
                  <td>{task.assigned_user || 'Unassigned'}</td>
                  <td>{format(new Date(task.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTasks;
