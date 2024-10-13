// /components/PropertyPage.js
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Mock Property Data
const mockPropertyData = {
  1: {
    id: 1,
    name: 'Sunset Villas',
    location: 'California',
    price: 1200,
    description: 'A beautiful villa with stunning sunset views.',
    amenities: ['Pool', 'Garden', 'Private Parking'],
    rooms: [
      {
        roomNumber: '101',
        tenant: { id: 1, name: 'John Doe', email: 'john@example.com' },
        rent: 1200,
        dueDate: '15th of every month',
      },
      {
        roomNumber: '102',
        tenant: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        rent: 1100,
        dueDate: '1st of every month',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Palm Apartments',
    location: 'Florida',
    price: 900,
    description: 'Modern apartments surrounded by palm trees.',
    amenities: ['Gym', 'Community Hall', 'Playground'],
    rooms: [
      {
        roomNumber: 'A1',
        tenant: { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
        rent: 900,
        dueDate: '5th of every month',
      },
      {
        roomNumber: 'A2',
        tenant: { id: 4, name: 'Bob Williams', email: 'bob@example.com' },
        rent: 950,
        dueDate: '10th of every month',
      },
    ],
  },
};

const PropertyPage = () => {
  const { id } = useParams(); // Extract property ID from URL
  const navigate = useNavigate();

  const property = mockPropertyData[id]; // Get property details based on ID

  if (!property) {
    return (
      <div style={styles.container}>
        <h1>Property Not Found</h1>
        <button onClick={() => navigate('/admin-dashboard')} style={styles.backButton}>
          Back to Admin Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>{property.name}</h1>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Description:</strong> {property.description}</p>

      <h3>Amenities:</h3>
      <ul>
        {property.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>

      <h3>Rooms and Tenants:</h3>
      <ul>
        {property.rooms.map((room, index) => (
          <li key={index} style={styles.roomItem}>
            <p><strong>Room Number:</strong> {room.roomNumber}</p>
            <p><strong>Tenant:</strong> {room.tenant.name} ({room.tenant.email})</p>
            <p><strong>Rent:</strong> ${room.rent}</p>
            <p><strong>Payment Due Date:</strong> {room.dueDate}</p>
            <Link to={`/tenant/${room.tenant.id}`} style={styles.viewTenantButton}>
              View Tenant
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/admin-dashboard')} style={styles.backButton}>
        Back to Admin Dashboard
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
  roomItem: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
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
  viewTenantButton: {
    marginTop: '10px',
    display: 'inline-block',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default PropertyPage;
