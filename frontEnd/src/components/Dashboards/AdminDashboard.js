// /components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const mockApplications = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    status: 'Pending',
    location: 'Palm Apartments',
    room: 'Room 2',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    status: 'Approved',
    location: 'Sunset Villas',
    room: 'Room 1',
  },
];

const mockMaintenanceRequests = [
  { description: 'Leaking faucet in kitchen', status: 'In Progress', location: 'Palm Apartments' },
  { description: 'Broken AC unit', status: 'Pending', location: 'Sunset Villas' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8000/properties'); // API call
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error('Failed to fetch properties');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

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
              <th onClick={() => sortProperties('city')} style={styles.sortableHeader}>
                City {sortConfig.key === 'city' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => sortProperties('state')} style={styles.sortableHeader}>
                State {sortConfig.key === 'state' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
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
                <td>{property.city}</td>
                <td>{property.state}</td>
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
  sortableHeader: {
    cursor: 'pointer',
    textAlign: 'left',
    padding: '10px',
  },
  logoutButton: {
    marginTop: '20px',
    backgroundColor: '#d9534f',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default AdminDashboard;
