import { Package, Factory, Pill, Coffee, ShoppingCart, Truck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Industries = () => {
  const industries = [
    { icon: <Truck size={32}/>, name: "Warehousing & Logistics", desc: "Heavy duty forklifts and pallet trucks for large scale distribution centers." },
    { icon: <Factory size={32}/>, name: "Manufacturing", desc: "Reliable material movement solutions for assembly lines and workshops." },
    { icon: <Package size={32}/>, name: "Automotive", desc: "Precision handling equipment for heavy automotive parts." },
    { icon: <Pill size={32}/>, name: "Pharmaceutical", desc: "Clean, electric-operated handling tools for sterile environments." },
    { icon: <Coffee size={32}/>, name: "Food & Beverage", desc: "Hygienic SS pipelines and stackers for food processing." },
    { icon: <ShoppingCart size={32}/>, name: "Retail & E-commerce", desc: "Agile and fast warehouse trucks for quick order fulfillment." }
  ];

  return (
    <>
      <SEO title="Industries We Serve" description="Material handling solutions tailored for various industries." />
      <div style={{padding: '60px 5%', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh'}}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 style={{color: '#041f4a', fontSize: '2.5rem', marginBottom: '10px'}}>Industries We Serve</h1>
          <p style={{color: '#666', fontSize: '1.1rem'}}>Tailored material handling solutions for diverse industrial sectors.</p>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px'}}>
          {industries.map((ind, idx) => (
            <motion.div 
              key={idx} 
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: idx * 0.1}}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              style={{background: 'var(--card-bg, #fff)', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color, #eee)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            >
              <div style={{display: 'inline-flex', padding: '20px', background: 'rgba(255,107,0,0.1)', borderRadius: '50%', color: '#ff6b00', marginBottom: '25px'}}>
                {ind.icon}
              </div>
              <h3 style={{color: 'var(--text-main, #041f4a)', marginBottom: '15px', fontSize: '1.4rem'}}>{ind.name}</h3>
              <p style={{color: 'var(--text-muted, #666)', lineHeight: '1.7', flexGrow: 1, marginBottom: '20px'}}>{ind.desc}</p>
              <Link to="/products" style={{color: '#ff6b00', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none'}}>
                View Equipment <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Industries;
