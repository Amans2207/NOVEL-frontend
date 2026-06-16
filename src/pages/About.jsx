import { CheckCircle, Target, Eye, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
  const features = [
    "High Quality Industrial Material Handling Equipment",
    "Expert Installation & Annual Maintenance Contracts",
    "Genuine Spare Parts for Trusted Brands",
    "Custom Industrial Solutions for Every Need",
    "Reliable On-time Service Delivery",
    "Experienced and Certified Technicians"
  ];

  return (
    <>
      <SEO title="About Us" description="Learn about Novel Enterprises, our history, and our material handling equipment." />
      <div className="about-container" style={{background: 'var(--bg-main, #f8fafc)', minHeight: '100vh', paddingBottom: '80px'}}>
        {/* Header */}
      <section className="about-header" style={{background: 'linear-gradient(rgba(4, 31, 74, 0.85), rgba(4, 31, 74, 0.95)), url("/hero_warehouse_1780053556430.png")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 5%', textAlign: 'center', color: '#fff'}}>
        <motion.h1 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} style={{fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800'}}>Our Story</motion.h1>
        <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} style={{fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto'}}>
          Leading the industry with innovative material handling solutions since our inception.
        </motion.p>
      </section>

      {/* About Content */}
      <section className="about-content" style={{maxWidth: '1200px', margin: '-50px auto 60px', background: 'var(--card-bg, #fff)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', position: 'relative', zIndex: 10}}>
        <div className="about-text" style={{flex: '1 1 500px'}}>
          <div style={{display: 'inline-block', padding: '8px 16px', background: 'rgba(255,107,0,0.1)', color: '#ff6b00', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '20px'}}>Who We Are</div>
          <h2 style={{color: 'var(--text-main, #041f4a)', fontSize: '2.5rem', marginBottom: '25px', lineHeight: '1.2'}}>Engineering Excellence in Material Handling</h2>
          <p style={{color: 'var(--text-muted, #555)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '20px'}}>
            Novel Enterprises is a premier provider of industrial material handling equipment, serving a diverse range of sectors including manufacturing, warehousing, logistics, and more. With a strong focus on quality and reliability, we supply robust machinery designed to enhance productivity and safety in your operations.
          </p>
          <p style={{color: 'var(--text-muted, #555)', lineHeight: '1.8', fontSize: '1.1rem'}}>
            Our comprehensive portfolio includes heavy-duty forklifts, electric stackers, hydraulic systems, EOT cranes, and a wide array of essential spare parts. Beyond providing top-tier products, we pride ourselves on our exceptional Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC).
          </p>
        </div>
        <div className="about-image" style={{flex: '1 1 400px'}}>
          <img src="/about_facility.png" alt="Novel Enterprises Facility" style={{width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{maxWidth: '1200px', margin: '0 auto 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', padding: '0 5%'}}>
        <motion.div whileHover={{y: -10}} style={{background: '#041f4a', padding: '40px', borderRadius: '16px', color: '#fff', boxShadow: '0 15px 30px rgba(4,31,74,0.15)'}}>
          <Eye size={40} color="#ff6b00" style={{marginBottom: '20px'}} />
          <h3 style={{fontSize: '1.8rem', marginBottom: '15px'}}>Our Vision</h3>
          <p style={{lineHeight: '1.7', opacity: 0.9}}>To be the most trusted and innovative partner in material handling, enabling warehouses globally to operate at their absolute peak efficiency with zero downtime.</p>
        </motion.div>
        <motion.div whileHover={{y: -10}} style={{background: '#ff6b00', padding: '40px', borderRadius: '16px', color: '#fff', boxShadow: '0 15px 30px rgba(255,107,0,0.2)'}}>
          <Target size={40} color="#041f4a" style={{marginBottom: '20px'}} />
          <h3 style={{fontSize: '1.8rem', marginBottom: '15px'}}>Our Mission</h3>
          <p style={{lineHeight: '1.7', opacity: 0.9}}>To deliver robust, high-performance equipment and unparalleled maintenance support, ensuring our clients achieve maximum operational safety and productivity.</p>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us" style={{background: 'var(--card-bg, #fff)', padding: '80px 5%', textAlign: 'center'}}>
        <div className="why-choose-us-inner" style={{maxWidth: '1200px', margin: '0 auto'}}>
          <Award size={48} color="#ff6b00" style={{marginBottom: '20px'}} />
          <div className="why-title">
            <h2 style={{color: 'var(--text-main, #041f4a)', fontSize: '2.5rem', marginBottom: '15px'}}>The Novel Advantage</h2>
            <p style={{color: 'var(--text-muted, #666)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 50px'}}>Why top industries choose us for their critical operations.</p>
          </div>
          
          <div className="features-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px'}}>
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="feature-card"
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{delay: idx * 0.1}}
                style={{background: 'var(--bg-main, #f8fafc)', padding: '30px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '15px', textAlign: 'left', border: '1px solid var(--border-color, #eee)'}}
              >
                <div style={{background: '#e0fbf0', padding: '10px', borderRadius: '50%'}}>
                  <CheckCircle className="feature-icon" size={24} color="#25d366" />
                </div>
                <span className="feature-text" style={{color: 'var(--text-main, #041f4a)', fontWeight: '600', fontSize: '1.1rem', lineHeight: '1.4', marginTop: '5px'}}>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
