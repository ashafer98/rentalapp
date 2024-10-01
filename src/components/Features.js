import React from 'react';

const Features = () => {
  return (
    <section id="features" className="features">
      <h2>Features</h2>
      <div className="feature-grid">
        <div className="feature">
          <i className="icon icon-house"></i>
          <h3>Easy Property Applications</h3>
          <p>Apply for homes directly through our app with a few clicks.</p>
        </div>
        <div className="feature">
          <i className="icon icon-shield"></i>
          <h3>Instant Background Checks</h3>
          <p>Secure background checks to ensure a safe and trustworthy process.</p>
        </div>
        <div className="feature">
          <i className="icon icon-clock"></i>
          <h3>Real-Time Listings</h3>
          <p>Stay updated with the latest properties in your area, at your fingertips.</p>
        </div>
        <div className="feature">
          <i className="icon icon-lock"></i>
          <h3>Secure Payments</h3>
          <p>Make safe and secure deposits or payments.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
