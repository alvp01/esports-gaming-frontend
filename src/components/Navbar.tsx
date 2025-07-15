import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h2>Esports Gaming</h2>
        </div>
        <div className="navbar-menu">
          <a href="#home" className="navbar-link">Home</a>
          <a href="#tournaments" className="navbar-link">Tournaments</a>
          <a href="#teams" className="navbar-link">Teams</a>
          <a href="#news" className="navbar-link">News</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;