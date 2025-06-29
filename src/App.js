// App.js
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    // Watch for changes to login status
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="container">
      <header><Header /></header>

      <main style={{ display: 'flex' }}>
        {isLoggedIn && <Sidebar />}
        <div className="content" style={{ flex: 1 }}>
          <AppRoutes />
        </div>
      </main>

      <footer><Footer /></footer>
    </div>
  );
}

export default App;
