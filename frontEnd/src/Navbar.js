import React, { useState } from 'react';
import './Navbar.css';
import logo from './photos/weebbrealestaeFullLgog.jpg'

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="#home">
            <img src={logo} alt="Webb Real Estate Logo" className="hero-logo-nav" />
            Webb realestate</a>
        </div>
        {/* <div className={`menu-icon ${isOpen ? 'active' : ''}`} onClick={toggleMenu}> */}
        {/* <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i> */}
        {/* </div> */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
  
        <ul>
        <li><a href="#home" onClick={() => onNavigate('home')}>Home</a></li>
        <li><a href="#applicant" onClick={() => onNavigate('applicant')}>Applicant</a></li>
        {/* Add more navigation links as needed */}
      </ul>
  
  
         <li><a href="#home" >Home</a></li>
          <li><a href="#features" >Features</a></li>
          <li><a href="#search-apply" >Search & Apply</a></li>
          <li><a href="#how-it-works" >How It Works</a></li>
          <li><a href="#contact" >Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;