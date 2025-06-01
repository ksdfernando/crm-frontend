import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  
 const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

localStorage.setItem('isLoggedIn', 'false');
  return (
    <div className="container">
      <header><Header /></header>
      <main>
        {isLoggedIn && <div className="sidebar"><Sidebar /></div>}
        <div className="content"><AppRoutes /></div>
      </main>
      <footer><Footer /></footer>
    </div>
  );
}

export default App;
