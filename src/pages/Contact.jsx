import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import axios from 'axios';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  const [settings, setSettings] = useState({
    phone: "+91 8010562953",
    email: "novelenterprises@gmail.com",
    address: "Plot No.A247, Five Star MIDC, Kagal, Kolhapur"
  });

  useEffect(() => {
    axios.get("https://vovel-backend-4.onrender.com" + '/api/settings').then(res => setSettings(res.data)).catch(console.error);
  }, []);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post("https://vovel-backend-4.onrender.com" + '/api/quote', formData);
      setStatus('Message sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <SEO title="Contact Us" description="Contact Novel Enterprises for material handling quotes and support." />
      <div className="contact-container">
        <section className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch for quotes, inquiries, and support.</p>
      </section>

      <section className="contact-content">
        {/* Info Panels */}
        <div className="contact-info-list">
          <h2>Reach Out To Us</h2>
          
          <div className="info-card">
            <div className="info-icon-wrapper"><Phone size={24} /></div>
            <div className="info-details">
              <h3>Phone Number</h3>
              <p>{settings.phone}</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon-wrapper"><Mail size={24} /></div>
            <div className="info-details">
              <h3>Email Address</h3>
              <p>{settings.email}</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon-wrapper"><MapPin size={24} /></div>
            <div className="info-details">
              <h3>Location</h3>
              <p>{settings.address}</p>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="contact-form-container">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <label>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
              </div>
            </div>
            
            <div className="input-group">
              <label>Your Message *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="5"></textarea>
            </div>
            
            <button type="submit" className="btn-primary">
              <Send size={18} /> Submit Inquiry
            </button>
            
            {status && (
              <div className={`status-message ${status.includes('success') ? 'status-success' : 'status-error'}`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;
