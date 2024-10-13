import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Hello, Admin!</h1>
      <p>Welcome to the Admin Dashboard.</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '100px auto',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
};

export default AdminDashboard;
