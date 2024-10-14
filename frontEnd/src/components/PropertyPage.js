// /components/PropertyPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const mockTenants = [
  { id: 1, name: 'John Doe', email: 'john@example.com', roomNumber: '101', rent: 1200, dueDate: '15th of every month' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', roomNumber: '102', rent: 1100, dueDate: '1st of every month' },
];

const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:8000/properties/${id}`);
        if (!response.ok) throw new Error('Failed to fetch property data');

        const data = await response.json();
        setProperty(data);
        setFormData(data); // Pre-fill update form with current data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update property');
      alert('Property updated successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete property');
      alert('Property deleted successfully!');
      navigate('/admin-dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h1>{property.name}</h1>
      <p><strong>Type:</strong> {property.type}</p>
      <p><strong>Location:</strong> {property.city}, {property.state}</p>
      <p><strong>Address:</strong> {property.address}, {property.zip}</p>
      <p><strong>Monthly Rent:</strong> ${property.rent}</p>
      <p><strong>Security Deposit:</strong> ${property.deposit}</p>
      <p><strong>Description:</strong> {property.description}</p>

      <h3>Images:</h3>
      <div style={styles.imageContainer}>
        {property.images.map((blob, index) => {
          const imageUrl = URL.createObjectURL(new Blob([Uint8Array.from(atob(blob), c => c.charCodeAt(0))]));
          return (
            <div key={index} style={styles.imageWrapper}>
              <img src={imageUrl} alt={`Property ${index}`} style={styles.image} />
            </div>
          );
        })}
      </div>

      <h3>Rooms and Tenants:</h3>
      <ul>
        {mockTenants.map((tenant) => (
          <li key={tenant.id} style={styles.roomItem}>
            <p><strong>Room Number:</strong> {tenant.roomNumber}</p>
            <p><strong>Tenant:</strong> {tenant.name} ({tenant.email})</p>
            <p><strong>Rent:</strong> ${tenant.rent}</p>
            <p><strong>Payment Due Date:</strong> {tenant.dueDate}</p>
            <Link to={`/tenant/${tenant.id}`} style={styles.viewTenantButton}>
              View Tenant
            </Link>
          </li>
        ))}
      </ul>

      <h3>Update Property:</h3>
      <div style={styles.updateForm}>
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleUpdate} style={styles.updateButton}>
          Update Property
        </button>
      </div>

      <button onClick={handleDelete} style={styles.deleteButton}>
        Delete Property
      </button>

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
    backgroundColor: '#fff',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
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
  imageContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10px',
  },
  imageWrapper: {
    borderRadius: '8px',
    overflow: 'hidden',
    width: '100px',
    height: '100px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  updateForm: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  updateButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default PropertyPage;
