import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if user is logged in (i.e., token is present)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Hello World! Welcome to your dashboard.</h1>
      <p>This is a simple dashboard displayed after you log in.</p>
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
