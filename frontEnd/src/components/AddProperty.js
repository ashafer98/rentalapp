// /components/AddProperty.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
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
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', property.name);
    formData.append('type', property.type);
    formData.append('address', property.address);
    formData.append('city', property.city);
    formData.append('state', property.state);
    formData.append('zip', property.zip);
    formData.append('rent', property.rent);
    formData.append('deposit', property.deposit);
    formData.append('description', property.description);

    // Append images to FormData
    property.images.forEach((image) => formData.append('images', image));

    try {
      const response = await fetch('http://localhost:8000/properties', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Property added successfully!');
        navigate('/admin-dashboard'); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to add property'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Add New Property</h2>

        {[
          { label: 'Property Name', name: 'name', type: 'text', placeholder: 'Enter property name' },
          { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter street address' },
          { label: 'City', name: 'city', type: 'text', placeholder: 'Enter city' },
          { label: 'State', name: 'state', type: 'text', placeholder: 'Enter state' },
          { label: 'ZIP Code', name: 'zip', type: 'text', placeholder: 'Enter ZIP code' },
          { label: 'Monthly Rent', name: 'rent', type: 'number', placeholder: 'Enter monthly rent' },
          { label: 'Security Deposit', name: 'deposit', type: 'number', placeholder: 'Enter security deposit' },
        ].map((field, index) => (
          <div style={styles.formGroup} key={index}>
            <label style={styles.label}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={property[field.name]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}

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
              <img src={preview.url} alt={`Preview ${index}`} style={styles.previewImage} />
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
