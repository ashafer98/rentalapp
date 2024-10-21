import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRoom, setNewRoom] = useState({ room_number: '', rent: '', due_date: '', tenant_id: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await fetch(`http://localhost:8000/properties/${id}`);
        if (!propertyResponse.ok) throw new Error('Failed to fetch property data');
        const propertyData = await propertyResponse.json();

        const roomsResponse = await fetch(`http://localhost:8000/rooms?property_id=${id}`);
        if (!roomsResponse.ok) throw new Error('Failed to fetch rooms data');

        let roomsData = await roomsResponse.json();
        roomsData = Array.isArray(roomsData) ? roomsData : [];

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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRoomChange = (field, value) => {
    setNewRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddRoom = async () => {
    try {
      const payload = {
        room_number: newRoom.room_number,
        rent: parseInt(newRoom.rent, 10) || 0, // Ensure rent is an integer
        due_date: newRoom.due_date,
        tenant_id: newRoom.tenant_id ? parseInt(newRoom.tenant_id, 10) : null, // Convert tenant_id to integer or null
        property_id: parseInt(id, 10), // Ensure property_id is an integer
      };

      const response = await fetch(`http://localhost:8000/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to add room');
      alert('Room added successfully!');
      setNewRoom({ room_number: '', rent: '', due_date: '', tenant_id: '' });
      navigate(0); // Refresh the page
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

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="container">
      <h1>{property.name}</h1>

      <h3>Rooms and Tenants:</h3>
      <div className="room-list">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="room-card">
              <p><strong>Room Number:</strong> {room.room_number}</p>
              <p><strong>Rent:</strong> ${room.rent}</p>
              <p><strong>Payment Due Date:</strong> {room.due_date}</p>
              <p><strong>Tenant:</strong> {room.tenant_name}</p>
              {room.tenant_id && (
                <Link to={`/tenant/${room.tenant_id}`} className="view-tenant-button">
                  View Tenant
                </Link>
              )}
            </div>
          ))
        ) : (
          <p>No rooms available for this property.</p>
        )}
      </div>

      <h3>Add New Room:</h3>
      <div className="add-room-form">
        <input
          type="text"
          placeholder="Room Number"
          value={newRoom.room_number}
          onChange={(e) => handleRoomChange('room_number', e.target.value)}
        />
        <input
          type="number"
          placeholder="Rent"
          value={newRoom.rent}
          onChange={(e) => handleRoomChange('rent', e.target.value)}
        />
        <input
          type="text"
          placeholder="Due Date"
          value={newRoom.due_date}
          onChange={(e) => handleRoomChange('due_date', e.target.value)}
        />
        <input
          type="number"
          placeholder="Tenant ID (Optional)"
          value={newRoom.tenant_id}
          onChange={(e) => handleRoomChange('tenant_id', e.target.value)}
        />
        <button onClick={handleAddRoom} className="add-room-button">
          Add Room
        </button>
      </div>

      <button onClick={handleDelete} className="delete-button">
        Delete Property
      </button>
      <button onClick={() => navigate('/admin-dashboard')} className="back-button">
        Back to Admin Dashboard
      </button>
    </div>
  );
};

export default PropertyPage;
