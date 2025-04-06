import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link to="/" className="navbar-title">Dr. Chatwell</Link>
      </div>
    </nav>
  );
};

export default Navbar;
