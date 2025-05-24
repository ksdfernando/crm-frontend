// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    api.post('/auth', { email, password }, { withCredentials: true })
      .then(res => {
        console.log("Server Response:", res.data);

        if (res.data.status === "success") {
          alert("Login successful!");
          
          localStorage.setItem("isLoggedIn", "true");
          
          navigate('/user');
          window.location.reload();
          console.log(localStorage.getItem("isLoggedIn")); 


          
        } else {
          alert("Login failed: " + res.data.status);
          localStorage.setItem('isLoggedIn', 'false');
        }
      })
      .catch(err => {
  console.error("Axios error:", err);

  if (err.response && err.response.status === 401) {
    alert("Login failed: " + err.response.data.message); // shows "Wrong password" or "Email not found"
  } else {
    alert("Login failed: server error");
  }
});

  }

  return (
    <main className="login">
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Login;
