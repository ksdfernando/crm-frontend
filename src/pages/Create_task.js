import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'js-cookie';
import '../App.css';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending',
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
      const res = await api.post('/task/create', formData);
      setMessage({ text: 'Task created successfully!', type: 'success' });

      setFormData({
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
        assigned_to: '',
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Error creating task',
        type: 'error'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Task</h2>

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
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="date"
          name="due_date"
         
          value={formData.due_date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
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
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
