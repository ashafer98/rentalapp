// /components/ViewTenant.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock Tenant Data
const mockTenants = {
  1: { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  2: { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
  3: { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-666-7777' },
  4: { id: 4, name: 'Bob Williams', email: 'bob@example.com', phone: '444-333-2222' },
};

const ViewTenant = () => {
  const { id } = useParams(); // Extract tenant ID from URL
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
