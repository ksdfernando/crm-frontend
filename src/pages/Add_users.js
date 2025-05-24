import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../App.css';


const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users'); // changed from '/user' to '/users' for consistency
        setUsers(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch users:', error.message);
        if (error.response) {
          console.error('📥 Response error:', error.response.data);
        } else if (error.request) {
          console.error('📡 No response from server:', error.request);
        } else {
          console.error('⚠️ Error setting up request:', error.message);
        }
      }
    };

    fetchUsers();
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

    const payload = {
      name: formData.name,
      email: formData.email,
      password_hash: formData.password,
      role: formData.role
    };

    try {
      await api.post('/users', payload); // keep endpoint consistent
      alert('✅ User added successfully!');
      setFormData({ name: '', email: '', password: '', role: '' });

      // Refresh user list
      const updatedUsers = await api.get('/users');
      setUsers(updatedUsers.data);

    } catch (err) {
      // alert(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
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

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="support_staff">Support Staff</option>
          <option value="sales_rep">Sales Rep</option>
          <option value="marketing_team">Marketing Team</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </form>

      <div className="mt-6">
        
        <ul className="text-sm text-gray-700">
          {users.map(user => (
            <li key={user.id} className="border-b py-1">{user.name} ({user.email})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddUser;
