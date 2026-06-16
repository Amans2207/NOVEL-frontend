import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, Search, Filter, ShoppingCart, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import './Products.css';

const defaultProducts = [
  { id: 'd1', name: 'Heavy Duty Forklift X-200', category: 'Forklifts', price: 1250000, description: 'High capacity forklift for industrial use.', placeholderText: 'Forklift' },
  { id: 'd2', name: 'Electric Pallet Truck V-Max', category: 'Pallet Trucks', price: 150000, description: 'Efficient electric pallet truck for warehouses.', placeholderText: 'Pallet Truck' },
  { id: 'd3', name: 'Industrial Reach Stacker', category: 'Stackers', price: 850000, description: 'Precision stacking up to 10 meters.', placeholderText: 'Stacker' },
  { id: 'd4', name: 'Manual Hand Pallet Jack', category: 'Pallet Trucks', price: 25000, description: 'Durable manual pallet jack.', placeholderText: 'Pallet Jack' },
  { id: 'd5', name: 'Automated Conveyor Belt System', category: 'Conveyors', price: 2100000, description: 'Custom length automated conveyor.', placeholderText: 'Conveyor' },
  { id: 'd6', name: 'Scissor Lift Platform', category: 'Lifts', price: 450000, description: 'Hydraulic scissor lift for high reach.', placeholderText: 'Scissor Lift' }
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    axios.get("https://vovel-backend-4.onrender.com" + '/api/products')
      .then(res => {
        const fetchedProducts = res.data;
        if (fetchedProducts.length === 0) {
           setProducts(defaultProducts);
           setCategories(['All', ...new Set(defaultProducts.map(p => p.category))]);
        } else {
           setProducts(fetchedProducts);
           setCategories(['All', ...new Set(fetchedProducts.map(p => p.category))]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts(defaultProducts);
        setCategories(['All', ...new Set(defaultProducts.map(p => p.category))]);
        setLoading(false);
      });
  }, []);

  let filteredProducts = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      <SEO title="Our Products | Novel Enterprises" description="Browse Novel Enterprises' comprehensive material handling equipment catalog." />
      
      <section className="products-hero-section">
        <div className="products-hero-content">
          <motion.h1 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}}>Premium Material Handling Equipment</motion.h1>
          <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
            Discover our extensive range of high-performance machinery designed to optimize your warehouse logistics and industrial operations.
          </motion.p>
          <motion.div className="hero-search-bar" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.2}}>
            <Search color="#94a3b8" size={20} />
            <input 
              type="text" 
              placeholder="Search products, models, or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      <div className="products-page-layout">
        <aside className="products-sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title"><Filter size={18} /> Categories</h3>
            <ul className="category-filter-list">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)} 
                    className={`cat-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  >
                    <span>{cat}</span> 
                    {activeCategory === cat && <ChevronRight size={16} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-widget promo-widget">
            <h4>Need Custom Equipment?</h4>
            <p>We provide tailored material handling solutions for specialized industrial needs.</p>
            <Link to="/contact" className="promo-btn">Request Quote</Link>
          </div>
        </aside>

        <div className="products-main-content">
          <div className="products-content-header">
            <h2>{activeCategory === 'All' ? 'All Products' : `${activeCategory}`}</h2>
            <span className="results-count">Showing {filteredProducts.length} results</span>
          </div>

          {loading ? (
             <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading catalog...</p>
             </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  className="modern-product-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  key={activeCategory + searchQuery}
                >
                  {filteredProducts.map(product => (
                    <motion.div key={product.id} variants={itemVariants} className="modern-product-card">
                      <Link to={`/products/${product.id}`} className="card-link-wrapper">
                        <div className="card-image-container">
                          <span className="card-badge">{product.category}</span>
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} />
                          ) : (
                            <div className="card-placeholder">
                              <Package size={48} color="#cbd5e1" />
                              <span>{product.placeholderText || product.name.split(' ')[0]}</span>
                            </div>
                          )}
                        </div>
                        <div className="card-info">
                          <h3 className="card-title">{product.name}</h3>
                          <p className="card-desc">{product.description?.substring(0, 60)}...</p>
                          <div className="card-footer">
                            <span className="card-price">₹{product.price.toLocaleString()}</span>
                            <span className="view-details-btn"><ShoppingCart size={16} /> Details</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div className="empty-state" initial={{opacity:0}} animate={{opacity:1}}>
                  <Package size={64} color="#e2e8f0" />
                  <h3>No products found</h3>
                  <p>We couldn't find any products matching your current filters.</p>
                  <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="btn-secondary">Clear Filters</button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
