// /components/Hero.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../photos/weebbrealestaeFullLgog.jpg'; // Adjust the path based on your image storage

const Hero = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/register');
  };

  return (
    <section id="home" style={styles.hero}>
      <div style={styles.overlay}>
        <div style={styles.heroContent}>
          <img src={logo} alt="Webb Real Estate Logo" style={styles.heroLogo} />

          <h1 style={styles.heading}>Find Your Dream Property Today</h1>
          <p style={styles.paragraph}>Your perfect home is just a few clicks away.</p>

          <button style={styles.ctaButton} onClick={handleApplyNow}>
            Apply Now
          </button>
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
    maxWidth: '600px',
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
    marginBottom: '20px',
    color: '#e0e0e0',
  },
  ctaButton: {
    backgroundColor: '#50e3c2',
    border: 'none',
    color: '#333',
    padding: '15px 30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
};

export default Hero;
