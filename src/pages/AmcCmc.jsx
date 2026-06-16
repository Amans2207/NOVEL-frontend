import { Shield, Settings, CheckCircle, ArrowRight, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
const AmcCmc = () => (
  <>
    <SEO title="AMC & CMC Contracts" description="Annual and Comprehensive Maintenance Contracts for Material Handling Equipment." />
    <div style={{padding: '60px 5%', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh'}}>
      <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} style={{textAlign: 'center', marginBottom: '60px'}}>
        <h1 style={{color: 'var(--text-main, #041f4a)', fontSize: '3rem', fontWeight: '800', marginBottom: '15px'}}>Protect Your Assets</h1>
        <p style={{color: 'var(--text-muted, #666)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6'}}>
          Minimize downtime and extend the lifespan of your material handling equipment with our enterprise-grade Annual & Comprehensive Maintenance Contracts.
        </p>
      </motion.div>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '80px'}}>
        {/* AMC Card */}
        <motion.div 
          initial={{opacity: 0, x: -30}} 
          animate={{opacity: 1, x: 0}}
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          style={{background: 'var(--card-bg, #fff)', padding: '50px 40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '6px solid #ff6b00', position: 'relative', display: 'flex', flexDirection: 'column'}}
        >
          <div style={{background: 'rgba(255,107,0,0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px'}}>
            <Shield size={36} color="#ff6b00" />
          </div>
          <h2 style={{color: 'var(--text-main, #041f4a)', fontSize: '1.8rem', marginBottom: '15px'}}>AMC Plan</h2>
          <p style={{color: '#ff6b00', fontWeight: 'bold', marginBottom: '20px'}}>Annual Maintenance Contract</p>
          <p style={{color: 'var(--text-muted, #555)', lineHeight: '1.7', marginBottom: '30px', flexGrow: 1}}>
            Essential preventive maintenance to ensure your forklifts run smoothly. Perfect for standard operational setups requiring regular tuning.
          </p>
          <ul style={{listStyle: 'none', padding: 0, marginBottom: '40px'}}>
             <li style={{marginBottom: '15px', color: 'var(--text-muted, #444)'}}><CheckCircle size={20} color="#25d366" style={{marginRight:'12px', verticalAlign:'middle'}}/> Scheduled Monthly Visits</li>
             <li style={{marginBottom: '15px', color: 'var(--text-muted, #444)'}}><CheckCircle size={20} color="#25d366" style={{marginRight:'12px', verticalAlign:'middle'}}/> Preventive Health Checks</li>
             <li style={{marginBottom: '15px', color: 'var(--text-muted, #444)'}}><CheckCircle size={20} color="#25d366" style={{marginRight:'12px', verticalAlign:'middle'}}/> Priority Breakdown Attendance</li>
             <li style={{marginBottom: '15px', color: '#999', textDecoration: 'line-through'}}><CheckCircle size={20} color="#ccc" style={{marginRight:'12px', verticalAlign:'middle'}}/> Free Spare Parts</li>
          </ul>
          <button onClick={() => window.dispatchEvent(new Event('open-quote-popup'))} style={{width: '100%', padding: '15px', background: 'transparent', border: '2px solid #ff6b00', color: '#ff6b00', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease'}} onMouseOver={(e) => { e.target.style.background = '#ff6b00'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ff6b00'; }}>
            Get AMC Quote <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* CMC Card */}
        <motion.div 
          initial={{opacity: 0, x: 30}} 
          animate={{opacity: 1, x: 0}}
          whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          style={{background: 'var(--card-bg, #fff)', padding: '50px 40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '6px solid #041f4a', position: 'relative', display: 'flex', flexDirection: 'column', transform: 'scale(1.02)'}}
        >
          <div style={{position: 'absolute', top: '15px', right: '15px', background: '#25d366', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px'}}>RECOMMENDED</div>
          <div style={{background: 'rgba(4,31,74,0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px'}}>
            <Settings size={36} color="#041f4a" />
          </div>
          <h2 style={{color: 'var(--text-main, #041f4a)', fontSize: '1.8rem', marginBottom: '15px'}}>CMC Plan</h2>
          <p style={{color: '#041f4a', fontWeight: 'bold', marginBottom: '20px'}}>Comprehensive Maintenance Contract</p>
          <p style={{color: 'var(--text-muted, #555)', lineHeight: '1.7', marginBottom: '30px', flexGrow: 1}}>
            The ultimate peace of mind. Covers all preventive maintenance, complete asset management, plus the cost of spare parts and major repair labor.
          </p>
          <ul style={{listStyle: 'none', padding: 0, marginBottom: '40px'}}>
             <li style={{marginBottom: '15px', color: 'var(--text-muted, #444)'}}><CheckCircle size={20} color="#25d366" style={{marginRight:'12px', verticalAlign:'middle'}}/> Scheduled Monthly Visits</li>
             <li style={{marginBottom: '15px', color: 'var(--text-muted, #444)'}}><CheckCircle size={20} color="#25d366" style={{marginRight:'12px', verticalAlign:'middle'}}/> Zero Labor Charges</li>
             <li style={{marginBottom: '15px', color: 'var(--text-muted, #444)'}}><CheckCircle size={20} color="#25d366" style={{marginRight:'12px', verticalAlign:'middle'}}/> Free Replacement of Parts</li>
             <li style={{marginBottom: '15px', color: 'var(--text-muted, #444)'}}><CheckCircle size={20} color="#25d366" style={{marginRight:'12px', verticalAlign:'middle'}}/> Complete Asset Insurance</li>
          </ul>
          <button onClick={() => window.dispatchEvent(new Event('open-quote-popup'))} style={{width: '100%', padding: '15px', background: '#041f4a', border: '2px solid #041f4a', color: '#fff', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease'}} onMouseOver={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#041f4a'; }} onMouseOut={(e) => { e.target.style.background = '#041f4a'; e.target.style.color = '#fff'; }}>
            Get CMC Quote <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Global CTA Banner */}
      <motion.div 
        initial={{opacity: 0, scale: 0.95}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
        style={{background: 'linear-gradient(135deg, #041f4a 0%, #0a2e6b 100%)', borderRadius: '16px', padding: '50px 30px', textAlign: 'center', color: '#fff', boxShadow: '0 20px 40px rgba(4, 31, 74, 0.2)'}}
      >
        <PhoneCall size={48} color="#ff6b00" style={{marginBottom: '20px'}} />
        <h2 style={{fontSize: '2.5rem', marginBottom: '15px'}}>Not Sure Which Plan Fits?</h2>
        <p style={{fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px'}}>
          Speak with our technical consultants to get a free fleet audit and find the best maintenance contract for your warehouse.
        </p>
        <a href="tel:+918010562953" style={{display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#ff6b00', color: '#fff', padding: '15px 40px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem'}}>
          Call Expert Now
        </a>
      </motion.div>
    </div>
  </>
);
export default AmcCmc;
