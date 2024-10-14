// /components/AddProperty.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProperty = ({ addProperty }) => {
  const [property, setProperty] = useState({
    name: '',
    type: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    rent: '',
    deposit: '',
    description: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]); // Store preview URLs
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Generate previews and update state
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setProperty((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (indexToRemove) => {
    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(property); // Pass new property data to dashboard
    navigate('/admin-dashboard'); // Redirect to dashboard
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Add New Property</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Property Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter property name"
            value={property.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Property Type</label>
          <select
            name="type"
            value={property.type}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Studio">Studio</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter street address"
            value={property.address}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={property.city}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>State</label>
          <input
            type="text"
            name="state"
            placeholder="Enter state"
            value={property.state}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>ZIP Code</label>
          <input
            type="text"
            name="zip"
            placeholder="Enter ZIP code"
            value={property.zip}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Monthly Rent</label>
          <input
            type="number"
            name="rent"
            placeholder="Enter monthly rent"
            value={property.rent}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Security Deposit</label>
          <input
            type="number"
            name="deposit"
            placeholder="Enter security deposit"
            value={property.deposit}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            placeholder="Enter property description"
            value={property.description}
            onChange={handleChange}
            rows="3"
            style={styles.input}
          ></textarea>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.input}
          />
        </div>

        <div style={styles.imagePreviewContainer}>
          {imagePreviews.map((preview, index) => (
            <div key={index} style={styles.imagePreview}>
              <img
                src={preview.url}
                alt={`Preview ${index}`}
                style={styles.previewImage}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
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
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  label: {
    width: '150px',
    textAlign: 'right',
  },
  input: {
    flex: '1',
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
    borderRadius: '5px',
  },
  imagePreviewContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  imagePreview: {
    position: 'relative',
  },
  previewImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  removeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
  },
};

export default AddProperty;
