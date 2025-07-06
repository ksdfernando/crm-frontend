import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '../App.css';

function MyTasks() {
  const [tasks, setTasks] = useState([]);
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
        return api.get(`/tasks/my-tasks/${currentUser.user_id}`);
      })
      .then(res => {
        if (res && res.data) {
          setTasks(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
      });
  }, []);

  const handleTaskClick = (task) => {
    navigate(`/task_details/${task.task_id}`, { state: { task } });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📋 My Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p className="no-leads">🚫 No tasks assigned to you.</p>
      ) : (
        <div className="lead-grid">
          {tasks.map(task => (
            <button
              key={task.task_id}
              className="lead-card"
              onClick={() => handleTaskClick(task)}
            >
              <div>
                <h3>📝 Task ID: {task.task_id}</h3>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Status:</strong> <span className="status">{task.status}</span></p>
                <p>
                  <strong>Due Date:</strong>{' '}
                  {task.due_date ? format(new Date(task.due_date.replace(' ', 'T')), 'dd MMM yyyy') : 'N/A'}
                </p>
                <p>
                  <strong>Created At:</strong>{' '}
                  {format(new Date(task.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}
                </p>
                <hr />
                <p><strong>Assigned User:</strong> {task.assigned_user}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTasks;
