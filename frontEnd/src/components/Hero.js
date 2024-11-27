import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../photos/weebbrealestaeFullLgog.jpg'; // Adjust the path based on your image storage

const Hero = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to register page
  };

  return (
    <section id="home" style={styles.hero}>
      <div style={styles.overlay}>
        <div style={styles.heroContent}>
          <img src={logo} alt="Webb Real Estate Logo" style={styles.heroLogo} />

          <h1 style={styles.heading}>Tenant Portal</h1>
          <p style={styles.paragraph}>Manage your rental account with ease.</p>

          <div style={styles.panelContainer}>
            {/* Existing Tenant Login Panel */}
            <div style={styles.panel}>
              <h2 style={styles.panelHeading}>Existing Tenants</h2>
              <p style={styles.panelText}>
                Log in to access your account and manage your rental details.
              </p>
              <button style={styles.ctaButton} onClick={handleLogin}>
                Login
              </button>
            </div>

            {/* New Tenant Register Panel */}
            <div style={{ ...styles.panel, ...styles.newTenantPanel }}>
              <h2 style={styles.panelHeading}>New Tenants</h2>
              <p style={styles.panelText}>
                Sign up to create an account and start your rental journey.
              </p>
              <button style={{ ...styles.ctaButton, ...styles.newTenantButton }} onClick={handleRegister}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #4a90e2, #50e3c2)',
    overflow: 'hidden',
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    textAlign: 'center',
    padding: '20px',
    zIndex: 2,
    maxWidth: '800px',
  },
  heroLogo: {
    width: '120px',
    height: 'auto',
    marginBottom: '20px',
    animation: 'fadeIn 2s ease-in-out',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    lineHeight: '1.2',
    fontWeight: 700,
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#e0e0e0',
  },
  panelContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  panel: {
    background: '#fff',
    color: '#333',
    borderRadius: '15px',
    padding: '20px 30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    flex: '1',
    maxWidth: '300px',
    textAlign: 'center',
  },
  newTenantPanel: {
    background: '#f9f9ff', // Light lavender shade for distinction
    border: '1px solid #ddd', // Subtle border for extra emphasis
  },
  panelHeading: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    fontWeight: 700,
  },
  panelText: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#666',
  },
  ctaButton: {
    backgroundColor: '#50e3c2',
    border: 'none',
    color: '#333',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  },
  newTenantButton: {
    backgroundColor: '#4a90e2', // Stronger color for focus
    color: '#fff', // White text for contrast
  },
};

export default Hero;
