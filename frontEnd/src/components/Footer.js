import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <a href="/">About Us</a>
        <a href="/">Privacy Policy</a>
        <a href="/">Contact Us</a>
        <a href="/">Blog</a>
      </div>
      <div className="footer-app-links">
        <button>Get the App on iOS</button>
        <button>Get the App on Android</button>
      </div>
    </footer>
  );
};

export default Footer;
