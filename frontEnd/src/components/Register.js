import React, { useState } from 'react';
import './Register.css'; // Add this for custom CSS styling

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,  // Add isAdmin to form data
  });
  const [status, setStatus] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox input for isAdmin
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting form data:', JSON.stringify(formData)); // Debugging log for form data

    try {
      // Make the POST request to the registration API
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
      });

      console.log('Response status:', response.status); // Log the response status

      // If response is OK (201 status code or similar)
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');

        // Check if the response is JSON or plain text
        let responseMessage;
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          responseMessage = data.message || 'Registered successfully! Try logging in...';
        } else {
          responseMessage = await response.text(); // Handle plain text response
        }

        console.log('Response message:', responseMessage); // Debugging log for response data
        setStatus(responseMessage);

        // Reset the form after successful registration
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          isAdmin: false,  // Reset isAdmin to false
        });
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
        console.error('Error message:', errorMessage); // Log the error for debugging
      }
    } catch (error) {
      console.error('Error occurred:', error); // Log any error
      setStatus('An error occurred. Please try again later.');
    }
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
              checked={formData.isAdmin}  // Checkbox for isAdmin
              onChange={handleChange}
            />
            Is Admin
          </label>
        </div>
        <button type="submit">Submit Application</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Register;
