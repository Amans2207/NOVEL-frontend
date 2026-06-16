import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Clients = () => {
  const clients = [
    { id: 1, name: "Costco Wholesale" },
    { id: 2, name: "Delight Corporation" },
    { id: 3, name: "Delta Aqua" },
    { id: 4, name: "Denzai" },
    { id: 5, name: "Divine Bamboo" },
    { id: 6, name: "Eurotex" },
    { id: 7, name: "FTB" },
    { id: 8, name: "FortuneAgro" },
    { id: 9, name: "GM Industries" },
    { id: 10, name: "Hitech India Equipments" },
    { id: 11, name: "Indo Count" },
    { id: 12, name: "Zanvar Group of Industries" },
    { id: 13, name: "Keshri" },
    { id: 14, name: "Mahalaxmi Electricals" },
    { id: 15, name: "Micronix" },
    { id: 16, name: "Mohan" },
    { id: 17, name: "Noble Engineers" },
    { id: 18, name: "Perfect Sales Electronics (PSE)" },
    { id: 19, name: "P.R. Engineering Works" },
    { id: 20, name: "Pune Cantonment Board" },
    { id: 21, name: "Ramkrishna Foundry Pvt. Ltd." },
    { id: 22, name: "Raysons Group" },
    { id: 23, name: "Sahil Industries" },
    { id: 24, name: "MahaTransco" },
    { id: 25, name: "Malu Group" },
    { id: 26, name: "Mantri Metallics" },
    { id: 27, name: "MEL Services" }
  ];

  return (
    <>
      <SEO 
        title="Our Clients - Novel Enterprises" 
        description="We are proud to serve top businesses and industries."
      />
      <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#041f4a', marginBottom: '15px' }}>
              OUR TRUSTED CLIENTS
            </h1>
            <div style={{ width: '60px', height: '4px', backgroundColor: '#ff6b00', margin: '0 auto', borderRadius: '2px' }}></div>
            <p style={{ marginTop: '20px', color: '#666', fontSize: '1.1rem' }}>
              We deliver industrial excellence to industry leaders across the globe.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '30px' 
          }}>
            {clients.map((client, idx) => (
              <motion.div 
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #eaeaea', 
                  borderRadius: '12px', 
                  padding: '30px', 
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  backgroundColor: '#e2e4e8', 
                  borderRadius: '50%', 
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Placeholder Logo */}
                  <span style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 'bold' }}>LOGO</span>
                </div>
                <h3 style={{ fontSize: '1rem', color: '#041f4a', fontWeight: '600' }}>{client.name}</h3>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Clients;
