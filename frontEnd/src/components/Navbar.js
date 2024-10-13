import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../photos/weebbrealestaeFullLgog.jpg';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <>
      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)}></div>}
      <nav className="navbar" ref={menuRef}>
        {/* Logo on the left */}
        <Link to="/" className="logo">
          <img src={logo} alt="Webb Real Estate Logo" className="hero-logo-nav" />
        </Link>

        {/* Hamburger menu on the right */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Slide-in menu */}
        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="nav-button">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-button logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="nav-button">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="nav-button">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
