import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  // State to store user details
  const [error, setError] = useState(null);  // State to handle error

  // Function to fetch user details from the API
  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();
      console.log(data)
      setUser(data);  // Store user details in state
    } catch (error) {
      setError('Error fetching user details');
      // localStorage.removeItem('token');  // Clear token if error occurs
      // navigate('/');  // Redirect to login page
    }
  };

  // Check if user is logged in and fetch user details
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/');
    } else {
      // Fetch user details using the token
      fetchUserDetails(token);
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Welcome to your dashboard!</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div>
          <h2>User Details:</h2>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Is Admin?:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>         
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
