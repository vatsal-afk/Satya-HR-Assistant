import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/', { replace: true });
      }
    };

    checkAuth();
    // Set up an interval to periodically check authentication
    const intervalId = setInterval(checkAuth, 5000); // Check every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  const token = localStorage.getItem('token');
  if (!token) {
    return null; // Render nothing while redirecting
  }

  return <Element />;
};

export default PrivateRoute;