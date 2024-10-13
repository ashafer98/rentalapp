import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import UserDashboard from './components/Dashboards/UserDashboard';
import Home from './components/Home';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is an admin

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
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setIsAdmin={setIsAdmin}
              />
            }
          />

          {/* Conditional routing to dashboards based on admin status */}
          <Route
            path="/dashboard"
            element={
              isAdmin ? <Navigate to="/admin-dashboard" /> : <UserDashboard />
            }
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
