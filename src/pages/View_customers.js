import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import api from '../services/api';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get('/viewcustomers');
        console.log('Fetched customers:', res.data);
        setCustomers(res.data);
      } catch (err) {
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = async () => {
    const hasFilters = searchTerm.trim() !== '' || statusFilter !== '' || dateFilter !== '';

    if (!hasFilters) {
      alert('Please enter at least one filter to search.');
      return;
    }

    try {
      const params = {};
      if (searchTerm.trim() !== '') params.search = searchTerm;
      if (statusFilter !== '') params.status = statusFilter;
      if (dateFilter !== '') params.date = dateFilter;

      const res = await api.get('/search', { params });
      console.log('Filtered result:', res.data);
      setCustomers(res.data);
    } catch (err) {
      console.error('Error filtering customers:', err);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('');
    api.get('/viewcustomers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Error resetting customers:', err));
  };

  const handleRowClick = (customerId) => {
    navigate(`/customers/${customerId}/history`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Customer List</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="lead">Lead</option>
          <option value="vip">VIP</option>
          <option value="suspended">Suspended</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Table */}
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((cust) => (
              <tr
                key={cust.customer_id}
                onClick={() => handleRowClick(cust.customer_id)}
                style={{ cursor: 'pointer' }}
              >
                <td>{cust.customer_id}</td>
                <td>{cust.name}</td>
                <td>{cust.phone}</td>
                <td>{cust.email}</td>
                <td>{new Date(cust.created_at).toLocaleDateString()}</td>
                <td>{cust.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomers;
