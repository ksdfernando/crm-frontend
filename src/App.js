import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import AppRoutes from './routes/AppRoutes';

import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
