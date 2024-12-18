import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Signup from './pages/Signup';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
          //  <ProtectedRoute>
              <Profile />
          //  </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
        //    <ProtectedRoute>
              <Matches />
          //  </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
