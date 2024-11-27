import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, isAdmin, requireAdmin, children }) => {
  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If the route requires admin access but the user is not an admin, redirect to the user dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  // If the route does not require admin or the user is allowed, render the child component
  return children;
};

export default ProtectedRoute;
