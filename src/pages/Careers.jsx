import { Users, Mail, Briefcase, GraduationCap, HeartPulse, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Careers = () => {
  const jobs = [
    { title: "Sr. Service Technician", type: "Full-Time", loc: "Kolhapur, MH", desc: "Looking for an experienced technician with expertise in forklift hydraulics and electrical troubleshooting." },
    { title: "B2B Sales Executive", type: "Full-Time", loc: "Pune / Mumbai", desc: "Driven sales professional to handle corporate clients for AMC, CMC, and new equipment sales." },
    { title: "Warehouse Automation Engineer", type: "Full-Time", loc: "Kolhapur, MH", desc: "Design and implement smart racking and automated storage systems for enterprise warehouses." }
  ];

  return (
    <>
      <Helmet>
        <title>Careers - Novel Enterprises</title>
        <meta name="description" content="Join the Novel Enterprises team. Explore career opportunities in material handling." />
        <link rel="canonical" href="https://www.novelmhe.com/careers" />
        <meta property="og:title" content="Careers - Novel Enterprises" />
        <meta property="og:description" content="Join the Novel Enterprises team. Explore career opportunities in material handling." />
      </Helmet>
      <div style={{background: 'var(--bg-main, #f8fafc)', minHeight: '100vh', paddingBottom: '80px'}}>
        
        {/* Header */}
        <section style={{background: 'linear-gradient(135deg, #041f4a 0%, #0a2e6b 100%)', padding: '100px 5%', textAlign: 'center', color: '#fff'}}>
          <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}}>
            <Users size={64} color="#ff6b00" style={{marginBottom: '20px'}} />
            <h1 style={{fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800'}}>Build Your Career With Us</h1>
            <p style={{fontSize: '1.2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6'}}>
              We are always looking for passionate engineers, technicians, and sales professionals to join the Novel Enterprises family and help shape the future of industrial material handling.
            </p>
          </motion.div>
        </section>

        {/* Perks Section */}
        <section style={{maxWidth: '1200px', margin: '-50px auto 60px', background: 'var(--card-bg, #fff)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', padding: '50px', position: 'relative', zIndex: 10}}>
          <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <h2 style={{color: 'var(--text-main, #041f4a)', fontSize: '2rem'}}>Why Work With Us?</h2>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px'}}>
            <motion.div whileHover={{y: -5}} style={{background: 'rgba(4,31,74,0.03)', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(4,31,74,0.05)'}}>
              <GraduationCap size={40} color="#ff6b00" style={{marginBottom: '15px'}} />
              <h3 style={{color: 'var(--text-main, #041f4a)', marginBottom: '10px'}}>Continuous Training</h3>
              <p style={{color: 'var(--text-muted, #666)', fontSize: '0.95rem'}}>Regular upskilling on the latest equipment.</p>
            </motion.div>
            <motion.div whileHover={{y: -5}} style={{background: 'rgba(4,31,74,0.03)', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(4,31,74,0.05)'}}>
              <HeartPulse size={40} color="#ff6b00" style={{marginBottom: '15px'}} />
              <h3 style={{color: 'var(--text-main, #041f4a)', marginBottom: '10px'}}>Health Benefits</h3>
              <p style={{color: 'var(--text-muted, #666)', fontSize: '0.95rem'}}>Comprehensive medical coverage for you.</p>
            </motion.div>
            <motion.div whileHover={{y: -5}} style={{background: 'rgba(4,31,74,0.03)', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(4,31,74,0.05)'}}>
              <Zap size={40} color="#ff6b00" style={{marginBottom: '15px'}} />
              <h3 style={{color: 'var(--text-main, #041f4a)', marginBottom: '10px'}}>Performance Bonus</h3>
              <p style={{color: 'var(--text-muted, #666)', fontSize: '0.95rem'}}>Rewarding hard work and target achievements.</p>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section style={{maxWidth: '1200px', margin: '0 auto 60px', padding: '0 5%'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '20px'}}>
            <h2 style={{color: 'var(--text-main, #041f4a)', fontSize: '2.5rem'}}>Current Openings</h2>
            <span style={{background: '#e0fbf0', color: '#25d366', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <CheckCircle size={16} /> 3 Positions Available
            </span>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {jobs.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{opacity: 0, x: -20}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{delay: idx * 0.1}}
                style={{background: 'var(--card-bg, #fff)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color, #eee)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'}}
              >
                <div>
                  <h3 style={{color: 'var(--text-main, #041f4a)', fontSize: '1.4rem', marginBottom: '10px'}}>{job.title}</h3>
                  <div style={{display: 'flex', gap: '15px', color: 'var(--text-muted, #666)', fontSize: '0.9rem', marginBottom: '10px'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Briefcase size={14} color="#ff6b00" /> {job.type}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>• {job.loc}</span>
                  </div>
                  <p style={{color: 'var(--text-muted, #555)', maxWidth: '600px'}}>{job.desc}</p>
                </div>
                <a href={`mailto:admin@novelmhe.com?subject=Job Application for ${job.title}`} style={{padding: '12px 24px', background: 'transparent', border: '2px solid #041f4a', color: '#041f4a', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease'}} onMouseOver={(e) => { e.target.style.background = '#041f4a'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#041f4a'; }}>
                  Apply Now <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global CTA Banner */}
        <motion.div 
          initial={{opacity: 0, scale: 0.95}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          style={{maxWidth: '1200px', margin: '0 auto', background: 'var(--card-bg, #fff)', borderRadius: '16px', padding: '50px 30px', textAlign: 'center', border: '1px solid var(--border-color, #eee)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}
        >
          <Mail size={48} color="#ff6b00" style={{marginBottom: '20px'}} />
          <h2 style={{fontSize: '2rem', marginBottom: '15px', color: 'var(--text-main, #041f4a)'}}>Don't See a Fit?</h2>
          <p style={{fontSize: '1.1rem', color: 'var(--text-muted, #666)', maxWidth: '600px', margin: '0 auto 30px'}}>
            We are always open to meeting talented people. Send us your resume anyway and we'll keep it on file.
          </p>
          <a href="mailto:admin@novelmhe.com?subject=General Job Application" style={{background: '#ff6b00', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(255,107,0,0.3)'}}>
            Drop Your Resume
          </a>
        </motion.div>

      </div>
    </>
  );
};
export default Careers;
