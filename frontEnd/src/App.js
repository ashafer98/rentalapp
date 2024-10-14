import React, { useState } from 'react';
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
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is an admin

  const PropertyPageWrapper = () => {
    const { id } = useParams(); // Extract the property ID from the URL
    return <PropertyPage id={id} />; // Pass ID as a prop to PropertyPage
  };

  const ViewTenantWrapper = () => {
    const { id } = useParams(); // Extract the tenant ID from the URL
    return <ViewTenant id={id} />; // Pass tenant ID as a prop to ViewTenant
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
            }
          />

          {/* Conditional routing based on admin status */}
          <Route
            path="/dashboard"
            element={
              isAdmin ? <Navigate to="/admin-dashboard" /> : <UserDashboard />
            }
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/property/:id" element={<PropertyPageWrapper />} /> {/* Property route */}
          <Route path="/tenant/:id" element={<ViewTenantWrapper />} /> {/* Tenant route */}
          <Route path="/add-property" element={<AddProperty />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
