// /components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Mock Data
const mockProperties = [
  { id: 1, name: 'Sunset Villas', location: 'California', price: 1200, rooms: 3, tenants: 2 },
  { id: 2, name: 'Palm Apartments', location: 'Florida', price: 900, rooms: 2, tenants: 1 },
  { id: 3, name: 'Ocean Breeze', location: 'Hawaii', price: 1500, rooms: 4, tenants: 3 },
];

const mockApplications = [
  { 
    firstName: 'John', lastName: 'Doe', email: 'john@example.com', 
    status: 'Pending', location: 'Palm Apartments', room: 'Room 2' 
  },
  { 
    firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', 
    status: 'Approved', location: 'Sunset Villas', room: 'Room 1' 
  },
];

const mockMaintenanceRequests = [
  { description: 'Leaking faucet in kitchen', status: 'In Progress', location: 'Palm Apartments' },
  { description: 'Broken AC unit', status: 'Pending', location: 'Sunset Villas' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState(mockProperties);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const sortProperties = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedProperties = [...properties].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setProperties(sortedProperties);
    setSortConfig({ key, direction });
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      <section style={styles.section}>
        <h2>Overview</h2>
        <p>Total Properties: {properties.length}</p>
        <p>Pending Applications: {mockApplications.filter((app) => app.status === 'Pending').length}</p>
      </section>

      <section style={styles.section}>
        <h2>Current Properties</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th onClick={() => sortProperties('name')} style={styles.sortableHeader}>
                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => sortProperties('type')} style={styles.sortableHeader}>
                Type {sortConfig.key === 'type' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => sortProperties('location')} style={styles.sortableHeader}>
                Location {sortConfig.key === 'location' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => sortProperties('rooms')} style={styles.sortableHeader}>
                # of Rooms {sortConfig.key === 'rooms' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => sortProperties('tenants')} style={styles.sortableHeader}>
                # of Tenants {sortConfig.key === 'tenants' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => sortProperties('price')} style={styles.sortableHeader}>
                Price {sortConfig.key === 'price' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>
                  <Link to={`/property/${property.id}`} style={styles.link}>
                    {property.name}
                  </Link>
                </td>
                <td>{property.type}</td>
                <td>{property.location}</td>
                <td>{property.rooms}</td>
                <td>{property.tenants}</td>
                <td>${property.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <button onClick={() => navigate('/add-property')} style={styles.addButton}>
        Add New Property
      </button>

      <section style={styles.section}>
        <h2>Applications</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Location</th>
              <th>Room #</th>
            </tr>
          </thead>
          <tbody>
            {mockApplications.map((app, index) => (
              <tr key={index}>
                <td>{app.firstName} {app.lastName}</td>
                <td>{app.email}</td>
                <td>{app.status}</td>
                <td>{app.location}</td>
                <td>{app.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={styles.section}>
        <h2>Maintenance Requests</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {mockMaintenanceRequests.map((req, index) => (
              <tr key={index}>
                <td>{req.description}</td>
                <td>{req.status}</td>
                <td>{req.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  addButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  link: {
    textDecoration: 'none',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  logoutButton: {
    marginTop: '20px',
    backgroundColor: '#d9534f',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
