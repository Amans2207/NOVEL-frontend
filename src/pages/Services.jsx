import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle, Zap, ShieldCheck, Cog, Droplet, ArrowRight, PhoneCall } from 'lucide-react';
import SEO from '../components/SEO';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("https://vovel-backend-4.onrender.com" + '/api/services')
      .then(res => setServices(res.data))
      .catch(console.error);
  }, []);

  const getServiceItems = (name) => {
    if (name.includes('Forklift')) return ['Wide range of load capacities', 'High fuel & battery efficiency', 'Comprehensive warranty support'];
    if (name.includes('Provider')) return ['24/7 emergency breakdown support', 'Custom AMC & CMC packages', 'Genuine spare parts guarantee'];
    if (name.includes('Welding')) return ['Custom heavy-duty fabrication', 'High-grade, durable materials', 'Precision structural testing'];
    if (name.includes('Pipe Line')) return ['Corrosion-resistant materials', 'Custom industrial layouts', 'High-pressure, leak-proof joints'];
    return ['Certified Engineers', 'Genuine Components', '24/7 Priority Support'];
  };

  const getIconForService = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('electrical')) return <Zap color="#ff6b00" size={28} />;
    if (lower.includes('pipe')) return <Droplet color="#ff6b00" size={28} />;
    if (lower.includes('provider') || lower.includes('amc')) return <ShieldCheck color="#ff6b00" size={28} />;
    if (lower.includes('welding') || lower.includes('fabrication')) return <Cog color="#ff6b00" size={28} />;
    return <Wrench color="#ff6b00" size={28} />;
  };

  return (
    <>
      <SEO title="Our Services" description="Comprehensive maintenance, overhaul, and technical assistance services." />
      <div style={{padding: '60px 5%', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh'}}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 style={{color: '#041f4a', fontSize: '2.5rem', marginBottom: '10px'}}>Our Services</h1>
          <p style={{color: '#666', fontSize: '1.1rem'}}>Expert support and maintenance for all your material handling needs.</p>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px'}}>
          {services.map((srv, idx) => (
            <motion.div 
              key={srv.id} 
              className="srv-card"
              style={{background: 'var(--card-bg, #fff)', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid var(--border-color, #eee)', position: 'relative', display: 'flex', flexDirection: 'column'}} 
              initial={{opacity:0, y:30}} 
              animate={{opacity:1, y:0}}
              transition={{delay: idx * 0.1}}
              whileHover={{ y: -10, boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}
            >
              <div style={{display:'flex', alignItems:'flex-start', gap:'15px', marginBottom:'20px'}}>
                <div style={{background:'rgba(255, 107, 0, 0.1)', padding:'14px', borderRadius:'12px', display:'flex'}}>
                  {getIconForService(srv.name)}
                </div>
                <h3 style={{margin:0, color:'var(--text-main, #041f4a)', fontSize:'1.3rem', lineHeight:'1.4', fontWeight: '700', marginTop: '5px'}}>{srv.name}</h3>
              </div>
              <p style={{color:'var(--text-muted, #666)', lineHeight:'1.7', fontSize: '0.95rem', flexGrow: 1}}>
                We provide highly professional, enterprise-grade {srv.name.toLowerCase()} tailored to maximize your operational efficiency and eliminate downtime.
              </p>
              
              <ul style={{listStyle:'none', padding:0, marginTop:'20px', marginBottom: '25px', color:'var(--text-muted, #555)', fontSize: '0.9rem'}}>
                {getServiceItems(srv.name).map((item, i) => (
                  <li key={i} style={{marginBottom:'12px', display:'flex', alignItems:'center'}}><CheckCircle size={16} color="#25d366" style={{marginRight:'10px', flexShrink: 0}}/> {item}</li>
                ))}
              </ul>

              <button 
                onClick={() => window.dispatchEvent(new Event('open-quote-popup'))} 
                style={{width: '100%', padding: '12px', background: 'transparent', border: '2px solid #041f4a', color: '#041f4a', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease'}}
                onMouseOver={(e) => { e.target.style.background = '#041f4a'; e.target.style.color = '#fff'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#041f4a'; }}
              >
                Book Service <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Global CTA Banner */}
        <motion.div 
          initial={{opacity: 0, scale: 0.95}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          style={{marginTop: '80px', background: 'linear-gradient(135deg, #041f4a 0%, #0a2e6b 100%)', borderRadius: '16px', padding: '50px 30px', textAlign: 'center', color: '#fff', boxShadow: '0 20px 40px rgba(4, 31, 74, 0.2)'}}
        >
          <PhoneCall size={48} color="#ff6b00" style={{marginBottom: '20px'}} />
          <h2 style={{fontSize: '2.5rem', marginBottom: '15px'}}>Need Urgent Assistance?</h2>
          <p style={{fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px'}}>
            Our rapid-response maintenance team is on standby 24/7 to resolve critical mechanical and electrical failures.
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
            <a href="tel:+918010562953" style={{background: '#ff6b00', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
              Call +91 8010562953
            </a>
            <a href="https://wa.me/918010562953" target="_blank" rel="noopener noreferrer" style={{background: '#25d366', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Services;
