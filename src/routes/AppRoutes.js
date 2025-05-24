// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/login';
import User from '../pages/User';
import Add_users from '../pages/Add_users';
import Add_customers from '../pages/add_customers';
import '../App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/add_users" element={<Add_users />} />
      <Route path="/add_customers" element={<Add_customers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
