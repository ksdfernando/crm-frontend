// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/login';
import User from '../pages/User';
import Add_users from '../pages/Add_users';
import Add_customers from '../pages/add_customers';
import Create_leads from '../pages/Create_leads';
import My_leads from '../pages/My_leads';
import My_ticket from '../pages/My_ticket';
import LeadDetails from '../pages/LeadDetails';
import TicketDetails from '../pages/TicketDetails';
import CreateTicket from '../pages/CreateTicket';
import View_customers from '../pages/View_customers';
import CustomerHistory from '../pages/CustomerHistory';
import CreateTask from '../pages/Create_task';
import My_task from '../pages/My_Task';
import All_tasks from '../pages/All_task';
import All_tickets from '../pages/All_tickets';
import All_leads from '../pages/All_lead';

import '../App.css';

// import TicketDetails from '../pages/TicketDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/add_users" element={<Add_users />} />
      <Route path="/add_customers" element={<Add_customers />} />
      <Route path="/view_customers" element={<View_customers />} />
    
     <Route path="/customers/:id/history" element={<CustomerHistory />} />
      <Route path="/create_leads" element={<Create_leads />} />
      <Route path="/my_leads" element={<My_leads />} />
      <Route path="/my_ticket" element={<My_ticket />} />
      <Route path="/my_task" element={<My_task />} />
      <Route path="/lead_details/:id" element={<LeadDetails />} />
      <Route path="/ticket_details/:id" element={<TicketDetails />} />
      <Route path="/create_ticket" element={<CreateTicket />} /> 
      <Route path="/create_task" element={<CreateTask />} /> 
      <Route path="/all_tasks" element={<All_tasks />} /> 
      <Route path="/all_ticket" element={<All_tickets />} /> 
        <Route path="/all_leads" element={<All_leads />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
