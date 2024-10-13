import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data to simulate API responses
const mockAdmin = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
};

const mockApplications = [
  { firstName: 'John', lastName: 'Doe', email: 'john@example.com', status: 'Pending' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', status: 'Approved' },
];

const mockProperties = [
  { name: 'Sunset Villas', location: 'California', price: 1200 },
  { name: 'Palm Apartments', location: 'Florida', price: 900 },
];

const mockTenants = [
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' },
  { firstName: 'Bob', lastName: 'Williams', email: 'bob@example.com' },
];

const mockMaintenanceRequests = [
  { description: 'Leaking faucet in kitchen', status: 'In Progress' },
  { description: 'Broken AC unit', status: 'Pending' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [applications, setApplications] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [newProperty, setNewProperty] = useState({ name: '', location: '', price: '' });

  useEffect(() => {
    // Simulate API calls using mock data
    setAdmin(mockAdmin);
    setApplications(mockApplications);
    setProperties(mockProperties);
    setTenants(mockTenants);
    setMaintenanceRequests(mockMaintenanceRequests);
  }, []);

  const handleAddProperty = (e) => {
    e.preventDefault();
    const addedProperty = { ...newProperty };
    setProperties([...properties, addedProperty]); // Add to mock properties
    setNewProperty({ name: '', location: '', price: '' }); // Reset form
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      <section style={styles.section}>
        <h2>Overview</h2>
        <p>Total Properties: {properties.length}</p>
        <p>Total Tenants: {tenants.length}</p>
        <p>Pending Applications: {applications.filter(app => app.status === 'Pending').length}</p>
      </section>

      <section style={styles.section}>
        <h2>Add New Property</h2>
        <form onSubmit={handleAddProperty} style={styles.form}>
          <input
            type="text"
            placeholder="Property Name"
            value={newProperty.name}
            onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Location"
            value={newProperty.location}
            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProperty.price}
            onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Property</button>
        </form>
      </section>

      <section style={styles.section}>
        <h2>Current Properties</h2>
        <ul>
          {properties.map((property, index) => (
            <li key={index}>{property.name} - {property.location} - ${property.price}</li>
          ))}
        </ul>
      </section>

      <section style={styles.section}>
        <h2>Applications</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index}>
                <td>{app.firstName} {app.lastName}</td>
                <td>{app.email}</td>
                <td>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={styles.section}>
        <h2>Maintenance Requests</h2>
        <ul>
          {maintenanceRequests.map((req, index) => (
            <li key={index}>{req.description} - {req.status}</li>
          ))}
        </ul>
      </section>

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
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  section: {
    marginTop: '30px',
    padding: '15px',
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  logoutButton: {
    marginTop: '20px',
    backgroundColor: '#d9534f',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
