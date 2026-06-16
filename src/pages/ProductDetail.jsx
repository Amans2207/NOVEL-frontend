import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Truck, ShieldCheck, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import './ProductDetail.css';

const defaultProducts = [
  { id: 'd1', name: 'Heavy Duty Forklift X-200', category: 'Forklifts', price: 1250000, description: 'High capacity forklift for industrial use.', placeholderText: 'Forklift' },
  { id: 'd2', name: 'Electric Pallet Truck V-Max', category: 'Pallet Trucks', price: 150000, description: 'Efficient electric pallet truck for warehouses.', placeholderText: 'Pallet Truck' },
  { id: 'd3', name: 'Industrial Reach Stacker', category: 'Stackers', price: 850000, description: 'Precision stacking up to 10 meters.', placeholderText: 'Stacker' },
  { id: 'd4', name: 'Manual Hand Pallet Jack', category: 'Pallet Trucks', price: 25000, description: 'Durable manual pallet jack.', placeholderText: 'Pallet Jack' },
  { id: 'd5', name: 'Automated Conveyor Belt System', category: 'Conveyors', price: 2100000, description: 'Custom length automated conveyor.', placeholderText: 'Conveyor' },
  { id: 'd6', name: 'Scissor Lift Platform', category: 'Lifts', price: 450000, description: 'Hydraulic scissor lift for high reach.', placeholderText: 'Scissor Lift' }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // Security: Prevent Screenshots & Downloads
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S' || e.key === 'c' || e.key === 'C'))) {
        e.preventDefault();
        alert('Screenshots, Copying, Printing, and Saving are disabled for secure documents.');
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen') {
         if (navigator.clipboard && navigator.clipboard.writeText) {
             navigator.clipboard.writeText('Screenshots disabled.');
         }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${"https://vovel-backend-4.onrender.com"}/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        // Fetch similar products based on category
        axios.get(`${"https://vovel-backend-4.onrender.com"}/api/products`)
          .then(allRes => {
            let similar = allRes.data.filter(p => p.category === res.data.category && p.id !== res.data.id).slice(0, 4);
            if(similar.length === 0) {
               similar = defaultProducts.filter(p => p.category === res.data.category && p.id !== res.data.id).slice(0, 4);
            }
            setSimilarProducts(similar);
          });
        setLoading(false);
      })
      .catch(err => {
        // Fallback for default UI demo
        const defaultProd = defaultProducts.find(p => p.id === id);
        if (defaultProd) {
           setProduct(defaultProd);
           let similar = defaultProducts.filter(p => p.category === defaultProd.category && p.id !== defaultProd.id).slice(0, 4);
           if (similar.length === 0) {
             similar = defaultProducts.filter(p => p.id !== defaultProd.id).slice(0, 4); // fallback to any
           }
           setSimilarProducts(similar);
        } else {
           console.error(err);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="product-detail-loader">
       <div className="spinner"></div>
       <p>Loading product details...</p>
    </div>
  );
  
  if (!product) return (
    <div className="product-not-found">
      <div className="not-found-card">
         <h2 style={{color: '#ef4444', marginBottom: '10px'}}>Product Not Found</h2>
         <p style={{color: '#64748b', marginBottom: '20px'}}>The product you are looking for does not exist or has been removed.</p>
         <Link to="/products" className="btn-primary">Return to Catalog</Link>
      </div>
    </div>
  );

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image_urls ? product.image_urls : (product.image_url ? [product.image_url] : []),
    "description": product.description || `Premium ${product.category} for industrial use.`,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Novel Enterprises"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://novelenterprises.in/products/${product.id}`,
      "priceCurrency": "INR",
      "price": product.price || "0",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Novel Enterprises"
      }
    }
  };

  return (
    <>
      <SEO 
        title={product.name} 
        description={product.description || `Buy ${product.name} from Novel Enterprises. High quality ${product.category}.`} 
        schema={schemaData}
        url={`/products/${product.id}`}
        ogImage={product.image_url}
        keywords={`${product.name}, ${product.category}, buy ${product.name}, industrial ${product.category}, material handling equipment`}
      />
      <div className="detail-page-wrapper">
        <div className="detail-container">
          {/* Breadcrumb */}
          <div className="breadcrumb-area">
            <div className="breadcrumb-inner">
              <Link to="/products" className="breadcrumb-link"><ArrowLeft size={16} /> Back to Catalog</Link>
              <span className="divider">/</span>
              <span className="breadcrumb-cat">{product.category}</span>
              <span className="divider">/</span>
              <span className="breadcrumb-name">{product.name}</span>
            </div>
          </div>

          <section className="detail-content">
            <div className="detail-grid">
              {/* Product Image Gallery */}
              <div className="detail-image-gallery">
                <div className="detail-image-box">
                  {product.image_urls && product.image_urls.length > 0 ? (
                    <img 
                      src={product.image_urls[activeImage]} 
                      alt={product.name} 
                      className="zoomable-image" 
                    />
                  ) : product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="zoomable-image" />
                  ) : (
                    <div className="detail-placeholder">
                      {product.placeholderText || product.name.split(' ')[0]}
                    </div>
                  )}
                </div>
                
                {product.image_urls && product.image_urls.length > 1 && (
                  <div className="thumbnail-row" style={{display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto'}}>
                    {product.image_urls.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveImage(idx)}
                        style={{
                          width: '80px', height: '80px', 
                          border: activeImage === idx ? '2px solid #ff6b00' : '1px solid #ddd',
                          borderRadius: '8px', cursor: 'pointer', overflow: 'hidden',
                          opacity: activeImage === idx ? 1 : 0.7, transition: 'all 0.2s'
                        }}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} view ${idx + 1}`} 
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="detail-info">
                <div className="detail-category-badge">{product.category}</div>
                <h1 className="detail-title">{product.name}</h1>
                <div className="detail-price">₹{product.price.toLocaleString()}</div>
                
                <p className="detail-description">{product.description || 'Premium industrial material handling equipment designed for maximum efficiency and durability. Manufactured with high-grade components to ensure a long operational lifespan.'}</p>
                
                <div className="trust-badges">
                  <div className="trust-badge">
                    <ShieldCheck size={20} className="trust-icon" /> <span>1 Year Warranty</span>
                  </div>
                  <div className="trust-badge">
                    <Truck size={20} className="trust-icon" /> <span>Pan-India Delivery</span>
                  </div>
                  <div className="trust-badge">
                    <Clock size={20} className="trust-icon" /> <span>24/7 Support</span>
                  </div>
                </div>

                <div className="key-features">
                  <h3>Key Features</h3>
                  <ul className="key-features-list">
                    <li><CheckCircle size={18} className="feature-icon-check" /> Industrial grade durability & high load capacity</li>
                    <li><CheckCircle size={18} className="feature-icon-check" /> Genuine spare parts availability guaranteed</li>
                    <li><CheckCircle size={18} className="feature-icon-check" /> Optional AMC (Annual Maintenance) support</li>
                  </ul>
                </div>

                <div className="detail-actions">
                  <a 
                    href={`https://wa.me/918010562953?text=Hi Novel Enterprises, I am interested in getting a quote for the *${product.name}* (₹${product.price}). Please share more details.`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Order on WhatsApp
                  </a>
                  <button className="btn-quote" onClick={() => window.dispatchEvent(new Event('open-quote-popup'))}>
                    Request Official Quote
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Specs Table */}
            <div className="specs-section">
              <h2>Technical Specifications</h2>
              <div className="specs-table-wrapper">
                <table className="specs-table">
                  <tbody>
                    <tr className="bg-gray">
                      <th>Product Name</th>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{product.category}</td>
                    </tr>
                    <tr className="bg-gray">
                      <th>Material</th>
                      <td>{product.material || 'High Strength Industrial Steel Alloy'}</td>
                    </tr>
                    <tr>
                      <th>Warranty</th>
                      <td>{product.warranty || '1 Year Comprehensive'}</td>
                    </tr>
                    <tr className="bg-gray">
                      <th>Usage</th>
                      <td>{product.usage || 'Industrial, Warehouse, Material Handling'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Brochure PDF (Secure Viewer) */}
            {product.brochure_url && (
              <div className="specs-section" style={{marginTop: '40px'}}>
                <h2>Product Brochure</h2>
                <div 
                  className="pdf-container" 
                  style={{
                    position: 'relative', 
                    width: '100%', 
                    height: '800px', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    background: '#f8fafc'
                  }}
                >
                  <iframe 
                    src={`${product.brochure_url}#toolbar=0&navpanes=0&scrollbar=0`}
                    width="100%" 
                    height="100%" 
                    style={{border: 'none', pointerEvents: 'auto'}}
                    title={`${product.name} Brochure`}
                  ></iframe>
                </div>
                <p style={{fontSize: '0.85rem', color: '#94a3b8', marginTop: '10px', textAlign: 'center'}}>
                   <ShieldCheck size={14} style={{verticalAlign: 'middle', marginRight: '4px'}} /> 
                   This document is secured. Downloading, printing, and screenshots are restricted.
                </p>
              </div>
            )}

            {/* Recommended Similar Products */}
            {similarProducts.length > 0 && (
              <div className="similar-products-section">
                <div className="section-header">
                  <h2>Recommended Similar Products</h2>
                  <div className="header-line"></div>
                </div>
                <div className="similar-grid">
                  {similarProducts.map(sim => (
                    <Link to={`/products/${sim.id}`} key={sim.id} className="similar-card">
                      <div className="similar-img-box">
                        <span className="similar-badge">{sim.category}</span>
                        {sim.image_url ? (
                          <img src={sim.image_url} alt={sim.name} />
                        ) : (
                          <div className="similar-placeholder">{sim.placeholderText || sim.name.split(' ')[0]}</div>
                        )}
                      </div>
                      <div className="similar-info">
                        <h4>{sim.name}</h4>
                        <div className="similar-footer">
                          <p className="similar-price">₹{sim.price ? sim.price.toLocaleString() : 0}</p>
                          <span className="view-link">View Details</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
