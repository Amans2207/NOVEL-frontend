import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Axios Interceptor for JWT
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Lazy loaded components for Code Splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Services = React.lazy(() => import('./pages/Services'));
const AmcCmc = React.lazy(() => import('./pages/AmcCmc'));
const Industries = React.lazy(() => import('./pages/Industries'));
const Spares = React.lazy(() => import('./pages/Spares'));
const Racking = React.lazy(() => import('./pages/Racking'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Careers = React.lazy(() => import('./pages/Careers'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));

const ItServices = React.lazy(() => import('./pages/ItServices'));
const Clients = React.lazy(() => import('./pages/Clients'));

function App() {
  const [visitorCount, setVisitorCount] = useState('...');

  useEffect(() => {
    // Silent Visit Tracking
    axios.post("https://vovel-backend-4.onrender.com" + '/api/track-visit')
      .then(res => setVisitorCount(res.data.total_visitors))
      .catch(() => setVisitorCount(524)); // fallback if backend is down
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={
          <div className="loading" style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#041f4a', fontWeight: 'bold' }}>
            Loading Novel Enterprises...
          </div>
        }>
          <Routes>
            <Route path="/" element={<MainLayout visitorCount={visitorCount} />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="amc-cmc" element={<AmcCmc />} />
              <Route path="industries" element={<Industries />} />
              <Route path="spares-parts" element={<Spares />} />
              <Route path="racking-automation" element={<Racking />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="careers" element={<Careers />} />
              <Route path="clients" element={<Clients />} />
              <Route path="it-services" element={<ItServices />} />
            </Route>
            
            <Route path="/admin-login" element={<AdminLogin />} />
            
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
