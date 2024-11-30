import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import UserDashboard from './components/Dashboards/UserDashboard';
import Home from './components/Home';
import Register from './components/Register';
import PropertyPage from './components/PropertyPage';
import ViewTenant from './components/ViewTenant';
import AddProperty from './components/AddProperty';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true'); // Convert to boolean

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true'; // Convert to boolean

    setIsLoggedIn(!!token);
    setIsAdmin(adminStatus);

    console.log("isLoggedIn = ", !!token);
    console.log("isAdmin = ", adminStatus);
  }, [isLoggedIn, isAdmin]); // Include dependencies to fix the warning

  const PropertyPageWrapper = () => {
    const { id } = useParams(); // Extract the property ID from the URL
    return isLoggedIn ? <PropertyPage id={id} /> : <Navigate to="/login" />;
  };

  const ViewTenantWrapper = () => {
    const { id } = useParams(); // Extract the tenant ID from the URL
    return isLoggedIn ? <ViewTenant id={id} /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
            }
          />

          {/* User Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn && !isAdmin ? <UserDashboard /> : <Navigate to="/" />
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin-dashboard"
            element={
              isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/" />
            }
          />

          {/* Property Page Route */}
          <Route
            path="/property/:id"
            element={isLoggedIn ? <PropertyPageWrapper /> : <Navigate to="/login" />}
          />

          {/* Tenant Page Route */}
          <Route
            path="/tenant/:id"
            element={isLoggedIn ? <ViewTenantWrapper /> : <Navigate to="/login" />}
          />

          {/* Add Property Route - Admin Only */}
          <Route
            path="/add-property"
            element={isLoggedIn && isAdmin ? <AddProperty /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
