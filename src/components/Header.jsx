import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, MapPin, Mail, Menu, X, Moon, Sun } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [settings, setSettings] = useState({
    phone: "+91 8010562953",
    email: "novelenterprises@gmail.com",
    address: "Plot No.A247, Kagal, Kolhapur"
  });
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    axios.get("https://vovel-backend-4.onrender.com" + '/api/settings').then(res => setSettings(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/products').then(res => {
      const uniqueCats = [...new Set(res.data.map(p => p.category))];
      setCategories(uniqueCats);
    }).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/services').then(res => {
      setServices(res.data);
    }).catch(console.error);
  }, []);
  return (
    <header className="global-header">
      <div className="topbar-main">
        <div className="logo-area">
          <img src="/logo.png" alt="Novel Enterprises Logo" className="brand-logo" />
        </div>
        <div className="topbar-right" style={{display: 'flex', alignItems: 'center'}}>
          <div className="topbar-info">
            <div className="info-item">
              <Phone size={16} className="icon-orange" /> {settings.phone}
            </div>
            <div className="info-item">
              <MapPin size={16} className="icon-orange" /> {settings.address}
            </div>
            <div className="info-item">
              <Mail size={16} className="icon-orange" /> {settings.email}
            </div>
            <button onClick={toggleTheme} style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center'}} title="Toggle Dark Mode">
              {theme === 'dark' ? <Sun size={20} color="#ffb880" /> : <Moon size={20} color="#041f4a" />}
            </button>
          </div>
          <Link to="/contact" className="topbar-btn">REQUEST A QUOTE</Link>
        </div>
      </div>
      
      <nav className="navbar-main">
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">MENU</span>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} color="#041f4a" /> : <Menu size={28} color="#041f4a" />}
          </button>
        </div>
        <div className={`nav-links-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>HOME</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>ABOUT US</NavLink>
          
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>PRODUCTS</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>SERVICES</NavLink>
          <NavLink to="/amc-cmc" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>AMC & CMC</NavLink>
          <NavLink to="/industries" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>INDUSTRIES</NavLink>
          <NavLink to="/spares-parts" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>SPARES & PARTS</NavLink>
          <NavLink to="/racking-automation" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>RACKING & AUTOMATION</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>GALLERY</NavLink>
          <NavLink to="/careers" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>CAREERS</NavLink>
          <NavLink to="/clients" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>CLIENTS</NavLink>
          <NavLink to="/it-services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>IT SERVICES</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>CONTACT US</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
