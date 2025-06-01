import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CreateLead = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'new',
    source: '',
    interested_in: '',
    assigned_to: ''
  });

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/allusers');
        setUsers(res.data);
      } catch (err) {
        console.error('Error loading users:', err);
        setMessage('❌ Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.post('/leads', formData);
      setMessage('✅ Lead created successfully!');
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'new',
        source: '',
        interested_in: '',
        assigned_to: ''
      });
    } catch (err) {
      setMessage(`❌ Error creating lead: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create New Lead</h2>

      {message && (
        <div className={`mb-4 text-center font-semibold ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>

        <input
          type="text"
          name="source"
          placeholder="Lead Source"
          value={formData.source}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
          <input
          type="text"
          name="interested_in"
          placeholder="Interested In"
          value={formData.interested_in }
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <select
          name="assigned_to"
          value={formData.assigned_to}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Assign to User</option>
          {users.map(user => (
            <option key={user.user_id} value={user.user_id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
};

export default CreateLead;