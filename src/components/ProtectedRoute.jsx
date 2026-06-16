import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token || token === 'null' || token === 'undefined') {
      setIsAuthenticated(false);
      return;
    }

    // Verify token with backend
    axios.get("https://vovel-backend-4.onrender.com" + '/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setIsAuthenticated(true))
    .catch(() => {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    });
  }, []);

  if (isAuthenticated === null) {
    return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#041f4a', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>Verifying Secure Access...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
