import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { format } from 'date-fns';
import '../App.css';

function TicketDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;

  const [status, setStatus] = useState(ticket?.status || 'open');
  const [update, setupdate] = useState(ticket?.update || '');
  
  // const [priority, setPriority] = useState(ticket?.priority || 'medium');
  const [timestamps, setTimestamps] = useState({
    created_at: ticket?.created_at,
    open_time: ticket?.open_time,
    inProgress_time: ticket?.inProgress_time,
    resolved_time: ticket?.resolved_time,
    closed_time: ticket?.closed_time
  });

  const [previousStatus, setPreviousStatus] = useState(ticket?.status || 'open');

  // ✅ Automatically mark as open if not already
  useEffect(() => {
    const autoOpenTicket = async () => {
      if (ticket && !ticket.open_time) {
        try {
          const now = new Date().toISOString();

          const updateData = {
            status: 'open',
            open_time: now
          };

          await api.put(`/tickets/update/${ticket.ticket_id}`, updateData);

          setStatus('open');
          setPreviousStatus('open');
          setTimestamps(prev => ({ ...prev, open_time: now }));

          console.log('✅ Ticket automatically marked as open.');
        } catch (error) {
          console.error('❌ Failed to auto-mark ticket as open:', error);
        }
      }
    };

    autoOpenTicket();
  }, [ticket]);

  // ❌ Ticket not found
  if (!ticket) {
    return (
      <div className="dashboard-container">
        <h2>Ticket Details</h2>
        <p>❌ No ticket data available. Please go back to <button onClick={() => navigate(-1)}>My Tickets</button>.</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      const updateData = {
        status,
        update
        
      };

      const now = new Date().toISOString();

      if (!timestamps.open_time && status === 'open') {
        updateData.open_time = now;
      } else if (status !== previousStatus) {
        
        if (status === 'in_progress') updateData.inProgress_time = now;
        else if (status === 'resolved') updateData.resolved_time = now;
        else if (status === 'closed') updateData.closed_time = now;
      }

      await api.put(`/tickets/update/${ticket.ticket_id}`, updateData);

      alert("✅ Ticket updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("❌ Failed to update ticket.");
    }
  };

  const formatTime = (datetime) =>
    datetime ? format(new Date(datetime.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a') : '—';

  return (
    <div className="dashboard-container">
      <h2>📩 Ticket Details</h2>
      <div className="lead-details-card">
        <p><strong>Ticket ID:</strong> {ticket.ticket_id}</p>
   <p>
  <strong>Priority:</strong>{' '}
  <span style={{ color: 'blue', fontWeight: 'bold' }}>
    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
  </span>
</p>


        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Description:</strong> {ticket.description}</p>

        <p><strong>Created At:</strong> {formatTime(timestamps.created_at)}</p>

        <hr />

        <h3>👤 Customer Info</h3>
        <p><strong>Name:</strong> {ticket.name}</p>
        <p><strong>Email:</strong> {ticket.email}</p>
        <p><strong>Phone:</strong> {ticket.phone}</p>
       
        <hr />
        <label><strong>Status:</strong>
          <select
            value={status}
            onChange={e => {
              // setPreviousStatus(status);
              setStatus(e.target.value);
            }}>
            <option value="open1">open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </label>

          <label><strong>Update:</strong>
          <textarea
            value={update}
            onChange={e => setupdate(e.target.value)}
            rows="5"
            placeholder="Add new update about this ticket..."
          />
        </label>
        

       

        <hr />
        <h3>📊 Status Pipeline</h3>
        <div className="status-pipeline">
          <div className={`stage ${timestamps.created_at ? 'active' : ''}`}>
            <div className="dot">🟢</div>
            <div className="content">
              <strong>Created At</strong>
              <div>{formatTime(timestamps.created_at)}</div>
            </div>
          </div>

          <div className={`stage ${timestamps.open_time ? 'active' : ''}`}>
            <div className="dot">📬</div>
            <div className="content">
              <strong>Open</strong>
              <div>{formatTime(timestamps.open_time)}</div>
            </div>
          </div>

          <div className={`stage ${timestamps.inProgress_time ? 'active' : ''}`}>
            <div className="dot">⚙️</div>
            <div className="content">
              <strong>In Progress</strong>
              <div>{formatTime(timestamps.inProgress_time)}</div>
            </div>
          </div>

          <div className={`stage ${timestamps.resolved_time ? 'active' : ''}`}>
            <div className="dot">✅</div>
            <div className="content">
              <strong>Resolved</strong>
              <div>{formatTime(timestamps.resolved_time)}</div>
            </div>
          </div>

          <div className={`stage ${timestamps.closed_time ? 'active' : ''}`}>
            <div className="dot">🔒</div>
            <div className="content">
              <strong>Closed</strong>
              <div>{formatTime(timestamps.closed_time)}</div>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button onClick={() => navigate(-1)} className="back-button">🔙 Back</button>
          <button onClick={handleSave} className="save-button">💾 Save</button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;




// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import api from '../services/api'; 
// import { format } from 'date-fns';
// import '../App.css';

// function TicketDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const ticket = location.state?.ticket;

//   const [status, setStatus] = useState(ticket?.status || 'open');
//   const [priority, setPriority] = useState(ticket?.priority || 'medium');

//   if (!ticket) {
//     return (
//       <div className="dashboard-container">
//         <h2>Ticket Details</h2>
//         <p>❌ No ticket data available. Please go back to <button onClick={() => navigate(-1)}>My Tickets</button>.</p>
//       </div>
//     );
//   }

//   const handleSave = async () => {
//    try {
//   await api.put(`/tickets/update/${ticket.ticket_id}`, {
//     status,
//     priority,
    
//   });
//   alert("✅ Ticket updated successfully!");
//   navigate(-1);
// } catch (error) {
//       console.error("Error updating ticket:", error);
//       alert("❌ Failed to update ticket.");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>📩 Ticket Details</h2>
//       <div className="lead-details-card">
//         <p><strong>Ticket ID:</strong> {ticket.ticket_id}</p>
//         <p><strong>Subject:</strong> {ticket.subject}</p>
//         <p><strong>Description:</strong> {ticket.description}</p>
//         <p><strong>Created At:</strong> {format(new Date(ticket.created_at.replace(' ', 'T')), 'dd MMM yyyy, hh:mm a')}</p>

//         <hr />

//         <h3>👤 Customer Info</h3>
//         <p><strong>Name:</strong> {ticket.name}</p>
//         <p><strong>Email:</strong> {ticket.email}</p>
//         <p><strong>Phone:</strong> {ticket.phone}</p>

//         <label><strong>Status:</strong>
//           <select value={status} onChange={e => setStatus(e.target.value)}>
//             <option value="open">Open</option>
//             <option value="in_progress">In Progress</option>
//             <option value="resolved">Resolved</option>
//             <option value="closed">Closed</option>
//           </select>
//         </label>

//         <label><strong>Priority:</strong>
//           <select value={priority} onChange={e => setPriority(e.target.value)}>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//             <option value="urgent">Urgent</option>
//           </select>
//         </label>

//         <div className="button-group">
//           <button onClick={() => navigate(-1)} className="back-button">🔙 Back</button>
//           <button onClick={handleSave} className="save-button">💾 Save</button>
       
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TicketDetails; 