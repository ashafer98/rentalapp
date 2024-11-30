import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Adjust this if you store the token elsewhere

  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;