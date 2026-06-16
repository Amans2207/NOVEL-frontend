import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './SmartPopup.css';

const SmartPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', message: '' });

  useEffect(() => {
    // Custom event listener for manual trigger
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-quote-popup', handleOpen);

    // Auto-open logic (only on Homepage after 12 seconds)
    let timer;
    if (window.location.pathname === '/') {
       timer = setTimeout(() => {
         setIsOpen(true);
       }, 12000);
    }

    return () => {
      window.removeEventListener('open-quote-popup', handleOpen);
      clearTimeout(timer);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://vovel-backend-4.onrender.com" + '/api/quote', formData)
      .then(res => {
         alert('Quote request submitted successfully!');
         setIsOpen(false);
         setFormData({ name: '', email: '', phone: '', location: '', message: '' });
      })
      .catch(err => {
         console.error(err);
         alert('Failed to submit quote.');
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Request a Quote</h2>
          <button onClick={() => setIsOpen(false)} className="close-btn"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="popup-form">
           <input type="text" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
           <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
           <input type="tel" placeholder="Phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
           <input type="text" placeholder="Location" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
           <textarea placeholder="Message" required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
           <button type="submit" className="submit-btn">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default SmartPopup;
