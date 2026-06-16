import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  CheckCircle, MapPin, Phone, Mail, Globe, Settings, FileText, 
  MessageCircle, ShieldCheck, Wrench, Zap, Truck, CheckSquare 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './Home.css';

const ProductCard = ({ product }) => (
  <motion.div whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} className="prod-card" style={{borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color, #eee)', background: 'var(--card-bg, #fff)'}}>
    <Link to={`/products/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
      <div className="prod-img-placeholder" style={{background: '#f8fafc', padding: product.image_url ? 0 : '20px', height: '180px'}}>
        {product.image_url ? <img src={product.image_url} alt={product.name} style={{width:'100%', height:'100%', objectFit:'cover', display: 'block'}} /> : (product.placeholderText || product.name.split(' ')[0])}
      </div>
      <div className="prod-info" style={{padding: '20px', textAlign: 'left'}}>
        <h4 style={{color: 'var(--text-main, #041f4a)', fontSize: '1.1rem', marginBottom: '8px'}}>{product.name}</h4>
        <p style={{color: 'var(--text-muted, #666)', fontSize: '0.9rem', lineHeight: '1.5'}}>{product.subtitle || 'High quality material handling equipment.'}</p>
      </div>
    </Link>
  </motion.div>
);

const ProductSkeleton = () => (
  <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div className="skeleton-pulse" style={{ width: '100%', height: '180px', borderRadius: '8px', marginBottom: '15px' }}></div>
    <div className="skeleton-pulse" style={{ width: '40%', height: '15px', borderRadius: '4px', marginBottom: '10px' }}></div>
    <div className="skeleton-pulse" style={{ width: '80%', height: '20px', borderRadius: '4px', marginBottom: '10px' }}></div>
    <div className="skeleton-pulse" style={{ width: '30%', height: '22px', borderRadius: '4px', marginBottom: '15px' }}></div>
    <div className="skeleton-pulse" style={{ width: '100%', height: '12px', borderRadius: '4px', marginBottom: '5px' }}></div>
    <div className="skeleton-pulse" style={{ width: '90%', height: '12px', borderRadius: '4px' }}></div>
  </div>
);

const ServiceSkeleton = () => (
  <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #e2e8f0' }}>
    <div className="skeleton-pulse" style={{ width: '60%', height: '22px', borderRadius: '4px', marginBottom: '20px' }}></div>
    <div className="skeleton-pulse" style={{ width: '90%', height: '14px', borderRadius: '4px', marginBottom: '12px' }}></div>
    <div className="skeleton-pulse" style={{ width: '80%', height: '14px', borderRadius: '4px', marginBottom: '12px' }}></div>
    <div className="skeleton-pulse" style={{ width: '85%', height: '14px', borderRadius: '4px' }}></div>
  </div>
);

const defaultInitialProducts = [
  { id: 'init-1', name: 'Forklift', subtitle: 'High capacity forklift', image_url: '/images/forklift.png' },
  { id: 'init-2', name: 'Electric Stacker', subtitle: 'Efficient warehouse stacker', image_url: '/images/stacker.png' },
  { id: 'init-3', name: 'Semi Electric', subtitle: 'Medium load stacker', image_url: '/images/stacker.png' },
  { id: 'init-4', name: 'Pallet Trucks', subtitle: 'Durable daily operations', image_url: '/images/pallet.png' },
  { id: 'init-5', name: 'Scissor Lift Tables', subtitle: 'Versatile lift tables', image_url: '/images/scissor.png' },
  { id: 'init-6', name: 'Drum Handling', subtitle: 'Safe handling equipment', image_url: '/images/drum.png' },
  { id: 'init-7', name: 'Goods Lifts', subtitle: 'Heavy duty vertical lifts', image_url: '/images/goods_lift.png' }
];

const defaultInitialServices = [
  { id: 's-1', name: 'Forklift Sale, Diesel & Electrical' },
  { id: 's-2', name: 'Service Provider' },
  { id: 's-3', name: 'Welding Structure' },
  { id: 's-4', name: 'SS Pipe Line' }
];

const Home = () => {
  const [products, setProducts] = useState(defaultInitialProducts);
  const [services, setServices] = useState(defaultInitialServices);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [settings, setSettings] = useState({
    company_name: "Novel Enterprises",
    phone: "+91 8010562953",
    email: "novelenterprises@gmail.com",
    address: "Plot No.A247, Five Star MIDC, Kagal, Kolhapur",
    linkedin: "",
    facebook: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const [prodRes, servRes] = await Promise.all([
          axios.get("https://vovel-backend-4.onrender.com" + '/api/products').catch(() => ({ data: [] })),
          axios.get("https://vovel-backend-4.onrender.com" + '/api/services').catch(() => ({ data: [] }))
        ]);
        
        axios.get("https://vovel-backend-4.onrender.com" + '/api/settings').then(res => setSettings(res.data)).catch(() => {});

        setProducts(prodRes.data.slice(0, 8));
        setServices(servRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const getServiceItems = (name) => {
    if (name.includes('Forklift')) return ['Wide range of load capacities', 'High fuel & battery efficiency', 'Comprehensive warranty support'];
    if (name.includes('Provider')) return ['24/7 emergency breakdown support', 'Custom AMC & CMC packages', 'Genuine spare parts guarantee'];
    if (name.includes('Welding')) return ['Custom heavy-duty fabrication', 'High-grade, durable materials', 'Precision structural testing'];
    if (name.includes('Pipe Line')) return ['Corrosion-resistant materials', 'Custom industrial layouts', 'High-pressure, leak-proof joints'];
    return ['Standard Feature 1', 'Standard Feature 2', 'Standard Feature 3'];
  };

  const dummyProducts = Array.from({ length: 4 }).map((_, i) => ({
    id: `dummy-${i}`, name: 'Premium Material Equipment', subtitle: 'Industrial grade placeholder for structure.', placeholderText: 'Loading'
  }));

  const dummyServices = Array.from({ length: 4 }).map((_, i) => ({
    id: `dummy-${i}`, name: 'Industrial Service', items: ['Maintenance & Support', 'Inspection & Testing', 'On-Site Delivery']
  }));

  const displayProducts = error || products.length === 0 ? dummyProducts : products;
  const displayServices = error || services.length === 0 ? dummyServices : services;


  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": settings.company_name || "Novel Enterprises",
    "image": "https://www.novelenterprises.com/logo.png",
    "description": "Leading manufacturer and supplier delivering high-quality material handling equipment and industrial solutions customized for your needs.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No.A247, Five Star MIDC",
      "addressLocality": "Kagal, Kolhapur",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "telephone": settings.phone || "+91-8010562953"
  };

  return (
    <>
      <SEO 
        title="Home" 
        description="Novel Enterprises is a leading manufacturer and supplier delivering high-quality material handling equipment and industrial solutions."
        schema={schemaData}
        url="/"
      />
      <div className="home-page-container">
      
      {/* LEFT SIDEBAR */}
      <aside className="left-sidebar">
        <div className="sidebar-section">
          <h2>About Us</h2>
          <p>Novel Enterprises is a leading manufacturer and supplier delivering high-quality material handling equipment and industrial solutions customized for your needs.</p>
        </div>

        <div className="sidebar-section">
          <h2>Why Choose Us?</h2>
          <ul className="why-list">
            <li><CheckCircle size={16} color="#ff6b00" style={{flexShrink:0}}/> <div><strong>Premium Quality:</strong> Robust construction</div></li>
            <li><CheckCircle size={16} color="#ff6b00" style={{flexShrink:0}}/> <div><strong>Customized Solutions:</strong> Equipment designed as per specific requirements</div></li>
            <li><CheckCircle size={16} color="#ff6b00" style={{flexShrink:0}}/> <div><strong>Timely Delivery:</strong> On-time delivery</div></li>
            <li><CheckCircle size={16} color="#ff6b00" style={{flexShrink:0}}/> <div><strong>After Sales Support:</strong> Dedicated support</div></li>
          </ul>
        </div>

        <div className="sidebar-section sidebar-contact">
          <h2>Contact Us</h2>
          <p><Phone size={14} color="#ff6b00" /> {settings.phone}</p>
          <p><Mail size={14} color="#ff6b00" /> {settings.email}</p>
          <p><MapPin size={14} color="#ff6b00" /> {settings.address}</p>
          <p><Globe size={14} color="#ff6b00" /> www.novelenterprises.com</p>
        </div>

        <div className="sidebar-section">
          <h2>We Also Take</h2>
          <ul className="we-take-list">
            <li><CheckSquare size={14} color="#ff6b00" style={{flexShrink:0}}/> Annual Maintenance</li>
            <li><CheckSquare size={14} color="#ff6b00" style={{flexShrink:0}}/> CMC Maintenance</li>
            <li><CheckSquare size={14} color="#ff6b00" style={{flexShrink:0}}/> Forklift AMC & CMC Service</li>
            <li><CheckSquare size={14} color="#ff6b00" style={{flexShrink:0}}/> EOT Crane Service</li>
            <li><CheckSquare size={14} color="#ff6b00" style={{flexShrink:0}}/> Hoist Crane Service</li>
          </ul>

        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content-area">
        
        {/* Hero Section */}
        <div className="hero-wrapper" style={{backgroundImage: 'url("/hero_warehouse_1780053556430.png")'}}>
          <div className="hero-gradient"></div>
          


          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>SMART SOLUTIONS <span>FOR SMARTER</span> MATERIAL HANDLING</h1>
            <h2>Manufacturer & Supplier of Material Handling Equipment</h2>
            <div className="hero-icons">
              <div className="hero-icon-item"><ShieldCheck size={18} color="#ff6b00"/> Strong Build Quality</div>
              <div className="hero-icon-item"><Zap size={18} color="#ff6b00"/> Reliable Performance</div>
              <div className="hero-icon-item"><ShieldCheck size={18} color="#ff6b00"/> Safe Operation</div>
              <div className="hero-icon-item"><Wrench size={18} color="#ff6b00"/> Low Maintenance</div>
            </div>
          </motion.div>
        </div>

        {/* Icon Divider Bar */}
        <div className="icon-divider">
          <div className="icon-row">
            <div className="divider-icon"><Truck size={24}/> Forklift</div>
            <div className="divider-icon"><Truck size={24}/> Electric Stacker</div>
            <div className="divider-icon"><Truck size={24}/> Semi Electric</div>
            <div className="divider-icon"><Truck size={24}/> Pallet Trucks</div>
            <div className="divider-icon"><Truck size={24}/> Scissor Lift Tables</div>
            <div className="divider-icon"><Truck size={24}/> Drum Handling</div>
            <div className="divider-icon"><Truck size={24}/> Goods Lifts</div>
          </div>
          <div className="divider-text">Lifting Businesses, Powering Progress</div>
        </div>

        {/* Our Products */}
        <section className="content-section">
          <h2 className="section-title-right">OUR PRODUCTS</h2>
          {isLoading ? (
            <div className="product-grid">
              {[1, 2, 3, 4].map(n => <ProductSkeleton key={n} />)}
            </div>
          ) : (
            <div className="product-grid">
              {displayProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* Our Services */}
        <section className="content-section">
          <h2 className="section-title-right">OUR SERVICES</h2>
          {isLoading ? (
            <div className="service-grid">
              {[1, 2, 3].map(n => <ServiceSkeleton key={n} />)}
            </div>
          ) : (
            <div className="service-grid">
              {displayServices.map((srv, idx) => (
                <div key={srv.id || idx} className="srv-card">
                  <h3>{srv.title || srv.name}</h3>
                  <ul className="srv-list">
                    {(srv.items || getServiceItems(srv.title || srv.name)).map((item, i) => (
                      <li key={i}><CheckCircle size={14} color="#ff6b00" style={{flexShrink: 0}}/> {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Middle Orange Banner */}
        <div className="middle-banner">
          <Settings size={32} />
          WE ALSO TAKE ANNUAL MAINTENANCE, CMC MAINTENANCE & FORKLIFT AMC & CMC SERVICE
        </div>

        {/* Details Bottom Grid */}
        <div className="details-grid">
          <div className="detail-box">
            <h3>Forklift Model We Deal In</h3>
            <div className="brands-flex">
              <span className="brand-badge">VOLTAS</span>
              <span className="brand-badge">Godrej</span>
              <span className="brand-badge">JOISTS</span>
              <span className="brand-badge">ACE</span>
              <span className="brand-badge">JUNGHEINRICH</span>
            </div>
          </div>

          <div className="detail-box">
            <h3>Forklift Engine Sale & Service</h3>
            <div className="brands-flex">
              <span className="brand-badge">TATA</span>
              <span className="brand-badge">MAHINDRA</span>
              <span className="brand-badge">KIRLOSKAR</span>
              <span className="brand-badge">SIMSON</span>
            </div>
          </div>

          <div className="detail-box">
            <h3>All Types of Hydraulic System in Work</h3>
            <div className="image-ph" style={{background: 'url("/media__1780049077236.png") center/cover', borderRadius: '8px', border: 'none', minHeight: '120px'}}></div>
          </div>

          <div className="detail-box">
            <h3>We Also Provide</h3>
            <ul className="check-list">
              <li><CheckCircle size={14} color="#ff6b00"/> All types of hydraulic seal</li>
              <li><CheckCircle size={14} color="#ff6b00"/> Pneumatic seal</li>
              <li><CheckCircle size={14} color="#ff6b00"/> Mechanical seal</li>
            </ul>
          </div>

          <div className="detail-box">
            <h3>Deal in All Types Forklift Spares</h3>
            <ul className="check-list">
              <li><CheckCircle size={14} color="#ff6b00"/> Controller</li>
              <li><CheckCircle size={14} color="#ff6b00"/> Contactor</li>
              <li><CheckCircle size={14} color="#ff6b00"/> Forklift Spares</li>
              <li><CheckCircle size={14} color="#ff6b00"/> With Tyre</li>
            </ul>
          </div>

          <div className="detail-box">
            <h3>Forklift AMC & CMC Service</h3>
            <ul className="check-list">
              <li><CheckCircle size={14} color="#ff6b00"/> Preventive Maintenance</li>
              <li><CheckCircle size={14} color="#ff6b00"/> Breakdown Support</li>
              <li><CheckCircle size={14} color="#ff6b00"/> Genuine Spare Parts</li>
              <li><CheckCircle size={14} color="#ff6b00"/> Extended Life</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Home;
