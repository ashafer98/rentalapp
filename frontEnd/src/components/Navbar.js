import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use Link and useNavigate for navigation
import './Navbar.css';
import logo from '../photos/weebbrealestaeFullLgog.jpg';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Handle logout by clearing the token and redirecting to the homepage
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Update the state to logged out
    navigate('/');  // Redirect to homepage after logging out
  };

  return (
    <nav className="navbar">
      <div className="navbar-list">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Webb Real Estate Logo" className="hero-logo-nav" />
            Webb Real Estate
          </Link>
        </div>
        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link> {/* Always show home */}
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button> {/* Show logout if logged in */}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link> {/* Show login if not logged in */}
              </li>
              <li>
                <Link to="/register">Register</Link> {/* Show register if not logged in */}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
