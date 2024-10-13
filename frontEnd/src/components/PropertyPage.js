// /components/PropertyPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock Property Data
const mockPropertyData = {
  1: {
    id: 1,
    name: 'Sunset Villas',
    location: 'California',
    price: 1200,
    description: 'A beautiful villa with stunning sunset views.',
    amenities: ['Pool', 'Garden', 'Private Parking'],
  },
  2: {
    id: 2,
    name: 'Palm Apartments',
    location: 'Florida',
    price: 900,
    description: 'Modern apartments surrounded by palm trees.',
    amenities: ['Gym', 'Community Hall', 'Playground'],
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

export default PropertyPage;
