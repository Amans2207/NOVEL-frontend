import { Wrench, Settings, ArrowRight, ShieldCheck, Zap, Droplet, Box, Cog } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Spares = () => (
  <>
    <SEO title="Spares & Parts" description="Genuine spare parts for material handling equipment." />
    <div style={{padding: '60px 5%', maxWidth: '1000px', margin: '0 auto', minHeight: '60vh'}}>
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <h1 style={{color: '#041f4a', fontSize: '2.5rem', marginBottom: '10px'}}>Spares & Parts</h1>
        <p style={{color: '#666', fontSize: '1.1rem'}}>100% Genuine spare parts for guaranteed performance.</p>
      </div>
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} style={{background: 'var(--card-bg, #fff)', padding: '50px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap', border: '1px solid var(--border-color, #eee)'}}>
        <div style={{flex: '1 1 400px'}}>
          <div style={{display: 'inline-flex', padding: '8px 16px', background: 'rgba(255,107,0,0.1)', color: '#ff6b00', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '20px'}}>
            OEM Certified Parts
          </div>
          <h2 style={{color: 'var(--text-main, #041f4a)', fontSize: '2.2rem', marginBottom: '20px', lineHeight: '1.2'}}>Quality You Can Trust</h2>
          <p style={{color: 'var(--text-muted, #555)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '30px'}}>Using non-genuine parts can compromise the safety and performance of your forklifts. We supply authentic OEM spare parts to ensure the longevity of your equipment and protect your warranty.</p>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div style={{background: 'rgba(4,31,74,0.05)', padding: '12px', borderRadius: '10px'}}><Cog color="#041f4a" size={24}/></div>
              <div><strong style={{color: 'var(--text-main, #041f4a)', display: 'block'}}>Engine Parts</strong><span style={{color: 'var(--text-muted, #666)', fontSize: '0.9rem'}}>TATA, Kirloskar</span></div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div style={{background: 'rgba(4,31,74,0.05)', padding: '12px', borderRadius: '10px'}}><Zap color="#041f4a" size={24}/></div>
              <div><strong style={{color: 'var(--text-main, #041f4a)', display: 'block'}}>Electrical</strong><span style={{color: 'var(--text-muted, #666)', fontSize: '0.9rem'}}>Controllers, Sensors</span></div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div style={{background: 'rgba(4,31,74,0.05)', padding: '12px', borderRadius: '10px'}}><Droplet color="#041f4a" size={24}/></div>
              <div><strong style={{color: 'var(--text-main, #041f4a)', display: 'block'}}>Hydraulics</strong><span style={{color: 'var(--text-muted, #666)', fontSize: '0.9rem'}}>Seals, Pumps, Valves</span></div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div style={{background: 'rgba(4,31,74,0.05)', padding: '12px', borderRadius: '10px'}}><Box color="#041f4a" size={24}/></div>
              <div><strong style={{color: 'var(--text-main, #041f4a)', display: 'block'}}>Consumables</strong><span style={{color: 'var(--text-muted, #666)', fontSize: '0.9rem'}}>Tyres, Lubricants</span></div>
            </div>
          </div>

          <button onClick={() => window.dispatchEvent(new Event('open-quote-popup'))} style={{padding: '16px 32px', background: '#ff6b00', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(255,107,0,0.3)'}}>
            Inquire for Parts <ArrowRight size={18} />
          </button>
        </div>
        
        <div style={{flex: '1 1 300px', textAlign: 'center'}}>
           <div style={{width: '350px', height: '350px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.05)'}}>
              <Settings size={150} color="#041f4a" style={{opacity: 0.8}} />
           </div>
        </div>
      </motion.div>
    </div>
  </>
);
export default Spares;
