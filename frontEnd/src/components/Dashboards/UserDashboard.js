import React from 'react';

const UserDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Hello, User!</h1>
      <p>Welcome to your Dashboard.</p>
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

export default UserDashboard;
