import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user details.');

      const data = await response.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      localStorage.removeItem('token');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      fetchUserDetails(token);
    }
  }, [navigate]);

  if (isLoading) return <p>Loading user details...</p>;

  return (
    <div style={styles.container}>
      <h1>User Dashboard</h1>
      {error && <p style={styles.error}>{error}</p>}
      {user ? (
        <>
          <div style={styles.details}>
            <h2>User Details:</h2>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Background Check:</strong> {user.backgroundCheck ? 'Completed' : 'Pending'}</p>
          </div>

          <section style={styles.section}>
            <h2>Lease Agreement</h2>
            {user.leaseAgreement ? (
              <a href={user.leaseAgreement} target="_blank" rel="noopener noreferrer">
                View Lease Agreement
              </a>
            ) : (
              <p>No lease agreement available.</p>
            )}
          </section>

          <section style={styles.section}>
            <h2>Payments</h2>
            <button
              style={styles.paymentButton}
              onClick={() => alert('Payment Process Started')}
            >
              Make a Payment
            </button>
            <h3>Payment History</h3>
            {user.paymentHistory && user.paymentHistory.length > 0 ? (
              <ul>
                {user.paymentHistory.map((payment, index) => (
                  <li key={index}>
                    <strong>Date:</strong> {payment.date} - <strong>Amount:</strong> ${payment.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment history available.</p>
            )}
          </section>
        </>
      ) : (
        <p>No user details available.</p>
      )}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
        style={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  details: {
    textAlign: 'left',
    marginTop: '20px',
  },
  section: {
    marginTop: '30px',
    padding: '15px',
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
    textAlign: 'left',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  paymentButton: {
    margin: '10px 0',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 15px',
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UserDashboard;
