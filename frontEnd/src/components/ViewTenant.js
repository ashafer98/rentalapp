// /components/ViewTenant.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock Tenant Data (with background check, lease, and payment history)
// Mock Tenant Data
// Mock Tenant Data
const mockTenants = {
    1: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      backgroundCheck: true,
      leaseAgreement: 'https://example.com/lease-1.pdf',
      house: 'Sunset Villas',
      roomNumber: '101',
      paymentHistory: [
        { date: '2024-09-01', amount: 1200 },
        { date: '2024-08-01', amount: 1200 },
      ],
      nextPaymentDate: '2024-10-01', // Example next payment date
    },
    2: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      backgroundCheck: false,
      leaseAgreement: 'https://example.com/lease-2.pdf',
      house: 'Sunset Villas',
      roomNumber: '102',
      paymentHistory: [
        { date: '2024-09-01', amount: 1100 },
        { date: '2024-08-01', amount: 1100 },
      ],
      nextPaymentDate: '2024-10-01',
    },
    3: {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '555-666-7777',
      backgroundCheck: true,
      leaseAgreement: 'https://example.com/lease-3.pdf',
      house: 'Palm Apartments',
      roomNumber: 'A1',
      paymentHistory: [
        { date: '2024-09-05', amount: 900 },
        { date: '2024-08-05', amount: 900 },
      ],
      nextPaymentDate: '2024-10-05',
    },
    4: {
      id: 4,
      name: 'Bob Williams',
      email: 'bob@example.com',
      phone: '444-333-2222',
      backgroundCheck: false,
      leaseAgreement: 'https://example.com/lease-4.pdf',
      house: 'Palm Apartments',
      roomNumber: 'A2',
      paymentHistory: [
        { date: '2024-09-10', amount: 950 },
        { date: '2024-08-10', amount: 950 },
      ],
      nextPaymentDate: '2024-10-10',
    },
  };
  
  
  const ViewTenant = ({ id }) => {
    const navigate = useNavigate();
    const tenant = mockTenants[id]; // Get tenant details based on ID
  
    if (!tenant) {
      return (
        <div style={styles.container}>
          <h1>Tenant Not Found</h1>
          <button onClick={() => navigate('/admin-dashboard')} style={styles.backButton}>
            Back to Admin Dashboard
          </button>
        </div>
      );
    }
  
    return (
      <div style={styles.container}>
        <h1>{tenant.name}</h1>
        <p><strong>Email:</strong> {tenant.email}</p>
        <p><strong>Phone:</strong> {tenant.phone}</p>
  
        <h3>Background Check</h3>
        <p>{tenant.backgroundCheck ? 'Completed' : 'Not Completed'}</p>
  
        <h3>Lease Agreement</h3>
        {tenant.leaseAgreement ? (
          <a
            href={tenant.leaseAgreement}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            View Lease Agreement
          </a>
        ) : (
          <p>No lease agreement available.</p>
        )}
  
        <h3>House and Room</h3>
        <p><strong>House:</strong> {tenant.house}</p>
        <p><strong>Room Number:</strong> {tenant.roomNumber}</p>
  
        <h3>Next Scheduled Payment</h3>
        <p><strong>Date:</strong> {tenant.nextPaymentDate}</p>
  
        <h3>Payment History</h3>
        {tenant.paymentHistory.length > 0 ? (
          <ul>
            {tenant.paymentHistory.map((payment, index) => (
              <li key={index}>
                <strong>Date:</strong> {payment.date} - <strong>Amount:</strong> ${payment.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No payment history available.</p>
        )}
  
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Back to Property
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
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
    backButton: {
      marginTop: '20px',
      padding: '10px 15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };
  
  export default ViewTenant;