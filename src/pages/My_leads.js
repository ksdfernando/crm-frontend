import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import '../App.css';

function MyLeads() {
  const [leads, setLeads] = useState([]);
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

        return api.get(`/leads/my-leads/${currentUser.user_id}`);
      })
      .then(res => {
        if (res && res.data) {
          setLeads(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching leads:", err);
      });
  }, []);

  
//   const handleLeadClick = (id) => {
//   navigate(`/lead_details/${id}`);
// };
const handleLeadClick = (lead) => {
  navigate(`/lead_details/${lead.lead_id}`, { state: { lead } });
};


  return (
   
    <div className="dashboard-container">
       
      <h2 className="dashboard-heading">📋 My Assigned Leads</h2>
      

      {leads.length === 0 ? (
        <p className="no-leads">🚫 No leads assigned to you.</p>
      ) : (
       
        <div className="lead-grid"> 
          {leads.map(lead => (
             <button
                key={lead.lead_id}
                className="lead-card"
                onClick={() => handleLeadClick(lead)}
  >
            <div key={lead.lead_id} >
              <h3>🧾 Lead ID: {lead.lead_id}</h3>
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone}</p>
              <p>
                 <strong>Created At:</strong>{' '}
                 {format(new Date(lead.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}
              </p>
              <p><strong>Interested In:</strong> {lead.interested_in}</p>
              <p><strong>Status:</strong> <span className="status">{lead.status}</span></p>
            </div>
            </button>
          ))}  
        </div>
       
      )}
     
    </div>
  );
}

export default MyLeads;
