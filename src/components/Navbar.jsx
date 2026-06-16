import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="global-header">
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-info">
          <div className="topbar-item"><Phone size={16} /> +91 8010562953</div>
          <div className="topbar-item"><Mail size={16} /> novelenterpris@gmail.com</div>
        </div>
      </div>
      
      {/* Main Nav */}
      <div className="navbar">
        <div className="logo">
          <span className="logo-blue">NOVEL</span> <span className="logo-orange">ENTERPRISES</span>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="#">Services</Link>
          <Link to="#">AMC & CMC</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
