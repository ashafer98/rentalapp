import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock Data for User
const mockUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '(123) 456-7890',
  backgroundCheck: true,
  leaseAgreement: '',
  paymentHistory: [
    { date: '2024-10-01', amount: 1200 },
    { date: '2024-09-01', amount: 1200 },
  ],
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user details with mock data
    setTimeout(() => {
      setUser(mockUserData);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  if (isLoading) return <p>Loading user details...</p>;

  const userDetailsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '15px',
    marginTop: '15px',
  };

  const userDetailCardStyle = {
    flex: 1,
    minWidth: '250px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    marginTop: 0,
    marginBottom: '10px',
    color: '#4CAF50',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return (
    <div className="page-card">
      <h1>User Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {user ? (
        <>
          <div style={userDetailsStyle}>
            <div style={userDetailCardStyle}>
              <h2 style={headerStyle}>Name</h2>
              <p>{user.firstName} {user.lastName}</p>
            </div>
            <div style={userDetailCardStyle}>
              <h2 style={headerStyle}>Email</h2>
              <p>{user.email}</p>
            </div>
            <div style={userDetailCardStyle}>
              <h2 style={headerStyle}>Phone Number</h2>
              <p>{user.phoneNumber}</p>
            </div>
            <div style={userDetailCardStyle}>
              <h2 style={headerStyle}>Background Check</h2>
              <p>{user.backgroundCheck ? 'Completed' : 'Pending'}</p>
            </div>
          </div>

          <div className="section">
            <h2>Lease Agreement</h2>
            {user.leaseAgreement ? (
              <a href={user.leaseAgreement} target="_blank" rel="noopener noreferrer">
                View Lease Agreement
              </a>
            ) : (
              <p>No lease agreement available.</p>
            )}
          </div>

          <div className="section">
            <h2>Payments</h2>
            <button className="button add-button" onClick={() => alert('Payment Process Started')}>
              Make a Payment
            </button>
            <h3>Payment History</h3>
            {user.paymentHistory && user.paymentHistory.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {user.paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.date}</td>
                      <td>${payment.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No payment history available.</p>
            )}
          </div>
        </>
      ) : (
        <p>No user details available.</p>
      )}

      <button className="button logout-button" onClick={() => {
        localStorage.removeItem('token');
        navigate('/');
      }}>
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
