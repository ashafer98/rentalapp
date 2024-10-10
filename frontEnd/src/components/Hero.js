import React from 'react';
import logo from '../photos/weebbrealestaeFullLgog.jpg';  // Adjust the path based on where your image is stored

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <img src={logo} alt="Webb Real Estate Logo" className="hero-logo" />

        <h1>Find Your Dream Property Today</h1>
        <p>Connecting You to Your Next Home with Ease</p>
        <button className="cta-button">Apply Now</button>
      </div>
    </section>
  );
};

export default Hero;