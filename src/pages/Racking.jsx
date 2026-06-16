import { LayoutGrid, ArrowRight, Grid, Server, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Racking = () => (
  <>
    <SEO title="Racking & Automation" description="Warehouse racking systems and automation solutions." />
    <div style={{padding: '60px 5%', maxWidth: '1000px', margin: '0 auto', minHeight: '60vh'}}>
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <h1 style={{color: '#041f4a', fontSize: '2.5rem', marginBottom: '10px'}}>Racking & Automation</h1>
        <p style={{color: '#666', fontSize: '1.1rem'}}>Maximize your warehouse storage space and efficiency.</p>
      </div>
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} style={{background: 'var(--card-bg, #fff)', padding: '60px 40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid var(--border-color, #eee)'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'inline-flex', padding: '20px', background: 'rgba(255,107,0,0.1)', borderRadius: '50%', marginBottom: '30px'}}>
            <LayoutGrid size={50} color="#ff6b00" />
          </div>
          <h2 style={{color: 'var(--text-main, #041f4a)', marginBottom: '20px', fontSize: '2.2rem'}}>Smart Warehouse Solutions</h2>
          <p style={{color: 'var(--text-muted, #555)', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto 50px', fontSize: '1.1rem'}}>
            Novel Enterprises provides end-to-end warehouse storage solutions. From initial CAD design to installation, we offer Heavy Duty Racking, Selective Racking, Drive-in/Drive-thru systems, and Mezzanine floors. Upgrade to our automated solutions for seamless inventory flow and maximum vertical space utilization.
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '50px'}}>
          <div style={{background: 'rgba(4,31,74,0.02)', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(4,31,74,0.05)'}}>
            <Grid size={40} color="#041f4a" style={{marginBottom: '15px'}} />
            <h3 style={{color: 'var(--text-main, #041f4a)', marginBottom: '10px'}}>Selective Racking</h3>
            <p style={{color: 'var(--text-muted, #666)', fontSize: '0.95rem'}}>High accessibility for fast-moving inventory.</p>
          </div>
          <div style={{background: 'rgba(4,31,74,0.02)', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(4,31,74,0.05)'}}>
            <Server size={40} color="#041f4a" style={{marginBottom: '15px'}} />
            <h3 style={{color: 'var(--text-main, #041f4a)', marginBottom: '10px'}}>Drive-in Systems</h3>
            <p style={{color: 'var(--text-muted, #666)', fontSize: '0.95rem'}}>High density storage for bulk materials.</p>
          </div>
          <div style={{background: 'rgba(4,31,74,0.02)', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(4,31,74,0.05)'}}>
            <Layers size={40} color="#041f4a" style={{marginBottom: '15px'}} />
            <h3 style={{color: 'var(--text-main, #041f4a)', marginBottom: '10px'}}>Mezzanine Floors</h3>
            <p style={{color: 'var(--text-muted, #666)', fontSize: '0.95rem'}}>Double your usable vertical floor space.</p>
          </div>
        </div>

        <div style={{textAlign: 'center'}}>
          <button onClick={() => window.dispatchEvent(new Event('open-quote-popup'))} style={{padding: '16px 32px', background: '#041f4a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(4,31,74,0.2)'}}>
            Request Warehouse Audit <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  </>
);
export default Racking;
