import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight, Package, Truck, Factory, Pill, Coffee, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const Footer = ({ visitorCount }) => {
  const [settings, setSettings] = useState({
    phone: "+91 8010562953",
    email: "novelenterprises@gmail.com",
    address: "Plot No.A247, Five Star MIDC, Kagal, Kolhapur, Maharashtra, India - 416216",
    company_name: "Novel Enterprises"
  });

  useEffect(() => {
    axios.get("https://vovel-backend-4.onrender.com" + '/api/settings').then(res => setSettings(res.data)).catch(console.error);
  }, []);
  return (
    <footer className="global-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about"><ChevronRight size={14} color="#fff"/> About Us</Link></li>
            <li><Link to="/products"><ChevronRight size={14} color="#fff"/> Products</Link></li>
            <li><Link to="/amc-cmc"><ChevronRight size={14} color="#fff"/> AMC & CMC</Link></li>
            <li><Link to="/services"><ChevronRight size={14} color="#fff"/> Services</Link></li>
            <li><Link to="/spares-parts"><ChevronRight size={14} color="#fff"/> Spares & Parts</Link></li>
            <li><Link to="/racking-automation"><ChevronRight size={14} color="#fff"/> Racking & Automation</Link></li>
            <li><Link to="/gallery"><ChevronRight size={14} color="#fff"/> Gallery</Link></li>
            <li><Link to="/contact"><ChevronRight size={14} color="#fff"/> Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Industries We Serve</h3>
          <ul className="industries-list">
            <li><Truck size={16} className="icon-orange"/> Warehousing & Logistics</li>
            <li><Factory size={16} className="icon-orange"/> Manufacturing Industry</li>
            <li><Package size={16} className="icon-orange"/> Automotive Industry</li>
            <li><Pill size={16} className="icon-orange"/> Pharmaceutical Industry</li>
            <li><Coffee size={16} className="icon-orange"/> Food & Beverages</li>
            <li><ShoppingCart size={16} className="icon-orange"/> E-Commerce & Retail</li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Get In Touch</h3>
          <div className="contact-details">
            <div className="contact-row">
              <MapPin size={20} className="icon-orange" style={{flexShrink: 0}}/>
              <span>{settings.address}</span>
            </div>
            <div className="contact-row">
              <Phone size={18} className="icon-orange" style={{flexShrink: 0}}/>
              <span>{settings.phone}</span>
            </div>
            <div className="contact-row">
              <Mail size={18} className="icon-orange" style={{flexShrink: 0}}/>
              <span>{settings.email}</span>
            </div>
          </div>

        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px'}}>
          <span>&copy; 2026 Novel Enterprises | All Rights Reserved</span>
          {visitorCount && <span style={{fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'}}>👁️ {visitorCount} Total Visitors</span>}
          <span>Designed & Developed by <a href="https://amanstudiodev.in/" target="_blank" rel="noopener noreferrer" className="agency-credit" style={{color: '#ff6b00', fontWeight: 'bold', textDecoration: 'none'}}>Aman Studio</a></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
