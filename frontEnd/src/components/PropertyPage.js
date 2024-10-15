import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PropertyPage = () => {
  const { id } = useParams(); // Property ID from the route
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]); // State to store rooms with tenant info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch property and rooms when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await fetch(`http://localhost:8000/properties/${id}`);
        if (!propertyResponse.ok) throw new Error('Failed to fetch property data');
        const propertyData = await propertyResponse.json();

        const roomsResponse = await fetch(`http://localhost:8000/rooms?property_id=${id}`);
        if (!roomsResponse.ok) throw new Error('Failed to fetch rooms data');
        const roomsData = await roomsResponse.json();

        // Fetch tenant names for each room
        const roomsWithTenantNames = await Promise.all(
          roomsData.map(async (room) => {
            if (room.tenant_id) {
              const tenantResponse = await fetch(`http://localhost:8000/tenants/${room.tenant_id}`);
              if (tenantResponse.ok) {
                const tenantData = await tenantResponse.json();
                return { ...room, tenant_name: tenantData.name };
              }
            }
            return { ...room, tenant_name: 'No tenant assigned' };
          })
        );

        setProperty(propertyData);
        setRooms(roomsWithTenantNames);
        setFormData(propertyData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      const response = await fetch(`http://localhost:8000/properties/${id}`, { method: 'DELETE' });
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
  if (!property) return <p>Property not found.</p>;

  return (
    <div style={styles.container}>
      <h1>{property.name}</h1>
      <p><strong>Type:</strong> {property.type}</p>
      <p><strong>Location:</strong> {property.city}, {property.state}</p>
      <p><strong>Address:</strong> {property.address}, {property.zip}</p>
      <p><strong>Monthly Rent:</strong> ${property.rent}</p>
      <p><strong>Security Deposit:</strong> ${property.deposit}</p>
      <p><strong>Description:</strong> {property.description}</p>

      <h3>Rooms and Tenants:</h3>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} style={styles.roomItem}>
            <p><strong>Room Number:</strong> {room.room_number}</p>
            <p><strong>Rent:</strong> ${room.rent}</p>
            <p><strong>Payment Due Date:</strong> {room.due_date}</p>
            <p><strong>Tenant:</strong> {room.tenant_name}</p>
            {room.tenant_id && (
              <Link to={`/tenant/${room.tenant_id}`} style={styles.viewTenantButton}>
                View Tenant
              </Link>
            )}
          </li>
        ))}
      </ul>

      <h3>Update Property:</h3>
      <div style={styles.updateForm}>
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={formData.name || ''}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city || ''}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state || ''}
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
  viewTenantButton: {
    marginTop: '10px',
    display: 'inline-block',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
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
