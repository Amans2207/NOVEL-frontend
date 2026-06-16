import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Camera, Megaphone, PenTool, Briefcase, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './ItServices.css';

const services = [
  {
    id: 'webdev',
    title: 'Web & E-Commerce Development',
    icon: <Monitor size={48} />,
    desc: 'End-to-end website development, custom designs, and seamless deployments. From official portfolios and landing pages to full-scale e-commerce platforms with secure payment integrations. We also revamp and migrate old websites to modern architectures.',
    features: ['Custom Web Design & Deploy', 'E-Commerce & Payment Gateways', 'Landing Pages & Portfolios', 'Website Revamp & Migration']
  },
  {
    id: 'media',
    title: 'Media Production & Editing',
    icon: <Camera size={48} />,
    desc: 'High-quality visual content creation. We offer professional photoshoots, video shoots, and specialized e-commerce product photography. Our post-production team handles advanced photo and video editing.',
    features: ['Professional Photoshoots', 'Cinematic Video Production', 'E-Commerce Product Photography', 'Advanced Photo/Video Editing']
  },
  {
    id: 'graphics',
    title: 'Graphic Design & Branding',
    icon: <PenTool size={48} />,
    desc: 'Build a strong brand identity with our creative design services. We craft stunning logos, engaging templates, pamphlets, and custom graphic designs tailored to your brand language.',
    features: ['Custom Logo Design', 'Brand Identity Graphics', 'Pamphlets & Templates', 'Marketing Materials']
  },
  {
    id: 'marketing',
    title: 'Social Media & Ads Management',
    icon: <Megaphone size={48} />,
    desc: 'Dominate the digital space. We handle your entire social media presence, including Instagram and Facebook account management, daily post creation, and highly targeted performance ad campaigns.',
    features: ['Instagram & Facebook Handling', 'Daily Post Creation', 'Performance Ad Campaigns', 'Social Media Strategy']
  },
  {
    id: 'b2b',
    title: 'B2B & 3rd Party Registrations',
    icon: <Briefcase size={48} />,
    desc: 'Expand your business reach across major B2B platforms. We handle end-to-end business registrations and profile setups on platforms like IndiaMart, JustDial, and more.',
    features: ['IndiaMart Registration', 'JustDial Setup', 'Google Business Profile', 'B2B Lead Generation Setup']
  }
];

const TiltWrapper = ({ children }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{ perspective: 2000, width: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', width: '100%' }}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: position.x - (isHovering ? 25 : 10),
        y: position.y - (isHovering ? 25 : 10),
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 107, 0, 0.8)',
        borderColor: isHovering ? '#ff6b00' : 'transparent',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

const ItServices = () => {
  const [activeTab, setActiveTab] = useState(services[0]);

  return (
    <>
      <Helmet>
        <title>Next-Gen IT Services | Novel Enterprises</title>
      </Helmet>

      <CustomCursor />

      <div className="it-super-container">
        
        {/* HERO SECTION */}
        <div className="it-super-hero">
          <div className="cyber-grid"></div>
          <div className="glow-sphere main-sphere"></div>
          
          {/* 3D TESSERACT */}
          <div className="cube-container">
             <div className="cube">
                <div className="cube-face front"></div>
                <div className="cube-face back"></div>
                <div className="cube-face right"></div>
                <div className="cube-face left"></div>
                <div className="cube-face top"></div>
                <div className="cube-face bottom"></div>
                
                <div className="cube-inner">
                   <div className="inner-face front"></div>
                   <div className="inner-face back"></div>
                   <div className="inner-face right"></div>
                   <div className="inner-face left"></div>
                   <div className="inner-face top"></div>
                   <div className="inner-face bottom"></div>
                </div>
             </div>
          </div>

          <div className="hero-content">
             <motion.div 
               className="badge-cyber"
               initial={{opacity: 0, scale: 0.8}}
               animate={{opacity: 1, scale: 1}}
               transition={{duration: 0.5}}
             >
                <Monitor size={14} /> NOVEL DIGITAL SOLUTIONS
             </motion.div>
             <motion.h1 
               className="glitch-title"
               initial={{opacity: 0, y: 50}}
               animate={{opacity: 1, y: 0}}
               transition={{duration: 0.8, delay: 0.2}}
             >
               ENGINEERING THE <br />
               <span className="hollow-text">FUTURE OF</span> IT
             </motion.h1>
             <motion.p 
               className="hero-sub"
               initial={{opacity: 0}}
               animate={{opacity: 1}}
               transition={{duration: 1, delay: 0.6}}
             >
               We don't just build software. We architect robust digital ecosystems that propel manufacturing and industrial enterprises into the next generation.
             </motion.p>
          </div>

          {/* INFINITE TECH MARQUEE */}
          <div className="tech-marquee">
            <div className="marquee-content">
              <span>REACT</span> <span className="dot">•</span>
              <span>NODE.JS</span> <span className="dot">•</span>
              <span>AWS</span> <span className="dot">•</span>
              <span>PYTHON</span> <span className="dot">•</span>
              <span>FIGMA</span> <span className="dot">•</span>
              <span>SHOPIFY</span> <span className="dot">•</span>
              <span>PREMIERE PRO</span> <span className="dot">•</span>
              <span>CYBERSECURITY</span> <span className="dot">•</span>
              <span>REACT</span> <span className="dot">•</span>
              <span>NODE.JS</span> <span className="dot">•</span>
              <span>AWS</span> <span className="dot">•</span>
              <span>PYTHON</span> <span className="dot">•</span>
              <span>FIGMA</span> <span className="dot">•</span>
              <span>SHOPIFY</span> <span className="dot">•</span>
              <span>PREMIERE PRO</span> <span className="dot">•</span>
              <span>CYBERSECURITY</span>
            </div>
          </div>

          <div className="scroll-indicator">
             <span>EXPLORE</span>
             <div className="line-down"></div>
          </div>
        </div>

        {/* INTERACTIVE CONSOLE SECTION */}
        <div className="console-section">
           <div className="console-header">
              <h2>CORE CAPABILITIES</h2>
              <p>Select a module to view specifications</p>
           </div>

           <TiltWrapper>
             <div className="console-layout" style={{ transform: 'translateZ(50px)' }}>
                <div className="console-sidebar">
                  {services.map((srv) => (
                    <button 
                      key={srv.id} 
                      className={`console-tab ${activeTab.id === srv.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(srv)}
                    >
                      <div className="tab-icon">{srv.icon}</div>
                      <span>{srv.title}</span>
                      {activeTab.id === srv.id && <ChevronRight className="tab-arrow" />}
                    </button>
                  ))}
                </div>
                
                <div className="console-display" style={{ transform: 'translateZ(30px)' }}>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeTab.id}
                      className="display-content"
                      initial={{opacity: 0, x: 20}}
                      animate={{opacity: 1, x: 0}}
                      exit={{opacity: 0, x: -20}}
                      transition={{duration: 0.3}}
                    >
                       <div className="display-icon-massive" style={{ transform: 'translateZ(60px)' }}>{activeTab.icon}</div>
                       <div className="display-text-area">
                          <h3 style={{ transform: 'translateZ(40px)' }}>{activeTab.title}</h3>
                          <p style={{ transform: 'translateZ(20px)' }}>{activeTab.desc}</p>
                          <div className="features-grid">
                             {activeTab.features.map((feat, idx) => (
                               <div key={idx} className="feat-pill" style={{ transform: `translateZ(${20 + idx * 5}px)` }}>
                                 <div className="feat-dot"></div> {feat}
                               </div>
                             ))}
                          </div>
                       </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
             </div>
           </TiltWrapper>
        </div>

        {/* STATS & METRICS */}
        <div className="metrics-section">
           <div className="metric-box">
              <span className="metric-number">100+</span>
              <span className="metric-label">Websites Deployed</span>
           </div>
           <div className="metric-box">
              <span className="metric-number">4K</span>
              <span className="metric-label">Ultra-HD Visual Media</span>
           </div>
           <div className="metric-box">
              <span className="metric-number">50+</span>
              <span className="metric-label">Brands Digitized</span>
           </div>
        </div>

        {/* FINAL CTA */}
        <div className="it-super-cta">
           <div className="cta-overlay-pattern"></div>
           <h2>INITIATE PROJECT PROTOCOL</h2>
           <button className="cyber-btn" onClick={() => window.dispatchEvent(new Event('open-quote-popup'))}>
              <span>DEPLOY SOLUTION</span>
           </button>
        </div>

      </div>
    </>
  );
};

export default ItServices;
