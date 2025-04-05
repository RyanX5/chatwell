import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



import HomePage from './pages/Home';
import Navbar from './components/Navbar';
import Report from './pages/Report';
import About from './pages/About';

import Features from './pages/Features';


function App() {
  // Check if there are any cookies
  const hasCookies = document.cookie.length > 0;

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto py-4">
        <Routes>
          {/* Redirect from root based on cookie presence */}
          <Route path="/" element={
            hasCookies ? <Navigate to="/report" replace /> : <HomePage />
          } />
          <Route path="/report" element={<Report/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/features" element={<Features/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
