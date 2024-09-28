import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if a token exists
  };

  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
