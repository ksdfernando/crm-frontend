import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../App.css';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: ''
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get('/customers');
        setCustomers(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch customers:', error.message);
        if (error.response) {
          console.error('📥 Response error:', error.response.data);
        } else if (error.request) {
          console.error('📡 No response from server:', error.request);
        } else {
          console.error('⚠️ Error setting up request:', error.message);
        }
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/customers', formData);
      alert('✅ Customer added successfully!');
      setFormData({ name: '', email: '', phone: '', status: '' });

      const updated = await api.get('/customers');
      setCustomers(updated.data);
    } catch (err) {
    //   alert(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
  <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border">
    <h2 className="text-2xl font-semibold mb-4 text-center">Add New Customer</h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
       <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="lead">Lead</option>
        <option value="vip">VIP</option>
        <option value="suspended">Suspended</option>
        <option value="closed">Closed</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Customer
      </button>
    </form>
  </div>
);

 
};

export default AddCustomer;
