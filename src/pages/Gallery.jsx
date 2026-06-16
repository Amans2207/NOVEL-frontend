import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios.get("https://vovel-backend-4.onrender.com" + '/api/gallery')
      .then(res => setGallery(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <SEO title="Project Gallery" description="View images of our successful projects and equipment installations." />
      <div style={{padding: '60px 5%', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh'}}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 style={{color: '#041f4a', fontSize: '2.5rem', marginBottom: '10px'}}>Project Gallery</h1>
          <p style={{color: '#666', fontSize: '1.1rem'}}>A glimpse into our state-of-the-art material handling equipment and facilities.</p>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px'}}>
          {gallery.map(img => (
            <motion.div 
              key={img.id} 
              style={{background: 'var(--card-bg, #fff)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid var(--border-color, #eee)', position: 'relative', cursor: 'zoom-in'}} 
              initial={{opacity:0, scale:0.95}} 
              animate={{opacity:1, scale:1}}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              <div style={{overflow: 'hidden'}}>
                <motion.img 
                  src={img.image_url} 
                  alt={img.title} 
                  style={{width:'100%', height:'280px', objectFit:'cover', display:'block'}} 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div style={{padding:'25px', position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}>
                <span style={{background:'#ff6b00', color:'#fff', padding:'5px 12px', borderRadius:'15px', fontSize:'0.75rem', fontWeight:'bold', display: 'inline-block', marginBottom: '10px'}}>{img.category}</span>
                <h3 style={{margin:0, color:'#fff', fontSize:'1.3rem'}}>{img.title}</h3>
              </div>
            </motion.div>
          ))}
          {gallery.length === 0 && (
             <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666'}}>
                <h3>No images uploaded yet.</h3>
                <p>Check back later for photos of our equipment and projects.</p>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
