import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Navbar.css';
import logo from '../photos/weebbrealestaeFullLgog.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Webb Real Estate Logo" className="hero-logo-nav" />
            Webb Real Estate
          </Link>
        </div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/login">Login</Link>  {/* Use Link for navigation */}
          </li>
          <li>
            <Link to="/register">Register</Link>  {/* Use Link for navigation */}
          </li>
          <li><a href="#features">Features</a></li>
          <li><a href="#search-apply">Search & Apply</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
