import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,
  });
  const [status, setStatus] = useState('');
  const [showLoginButton, setshowLoginButton] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); // Clear any existing status

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setshowLoginButton(true); // Show success modal
      } else {
        const contentType = response.headers.get('Content-Type');
        let errorMessage = 'Error submitting application.';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        setStatus(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
      console.error('Error occurred:', error);
    }
  };

  const handleModalClose = () => {
    setshowLoginButton(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="Register-card">
      <h2>Rental Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            Is Admin
          </label>
        </div>
        {!showLoginButton && <button type="submit">Submit Application</button>}
      </form>
      {status && <p className="error-message">{status}</p>}

      {/* Modal */}
      {showLoginButton && <div> <p>successfully registered please login</p> <button onClick={handleModalClose}>Login</button>
      </div>        
     }
    </div>
  );
};

export default Register;
