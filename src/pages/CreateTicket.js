import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'js-cookie';
import '../App.css';

const CreateTicket = () => {
  

 



  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    status: 'new', // Changed to lowercase to match backend
    customer_id: '',
    assigned_to: '',
   
  });
   
  
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const user = JSON.parse(Cookies.get('user') || '{}');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/allusers');
        setUsers(res.data);
      } catch (err) {
        setMessage({ text: 'Failed to load users', type: 'error' });
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
    setMessage({ text: '', type: '' });

    try {
      // First check if customer exists
      try {
        await api.get(`/customers/${formData.customer_id}`);
      } catch (err) {
        if (err.response?.status === 404) {
          setMessage({ text: 'Customer ID does not exist', type: 'error' });
          return;
        }
        throw err;
      }

      // Create ticket
      const res = await api.post('/ticket/create', formData);
      
      setMessage({ 
        text: 'Ticket created successfully!', 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        subject: '',
        description: '',
        priority: 'medium',
        status: 'new',
        customer_id: '',
        assigned_to: '',
      
      });

    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Error creating ticket',
        type: 'error' 
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Ticket</h2>

      {message.text && (
        <div className={`mb-4 text-center font-semibold ${
          message.type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customer_id"
          placeholder="Customer ID"
          value={formData.customer_id}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
          rows="4"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="new">New</option>
          <option value="open">Open</option>
          <option value="progress">In Progress</option>
          <option value="fixed">Fixed</option>
        </select>

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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;