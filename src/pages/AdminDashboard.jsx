import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package, MessageSquare, Upload, Edit, Trash2, Plus, CheckCircle, BarChart2, Building, Phone, Mail, Link, MapPin, Save, Users, FileText, Image, UploadCloud } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin-login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  const [stats, setStats] = useState({ total_products: 0, customer_inquiries: 0, total_visitors: 0 });
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [brochures, setBrochures] = useState([]);
  const [settings, setSettings] = useState({ company_name: '', phone: '', email: '', address: '', linkedin: '', facebook: '' });
  const [newCustomer, setNewCustomer] = useState({ company: '', contact_person: '', email: '', phone: '' });
  
  const [formData, setFormData] = useState({ name: '', category: 'Forklift', price: '', description: '', material: '', warranty: '', usage: '' });
  const [imageFile, setImageFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [settingsStatus, setSettingsStatus] = useState('');
  const [newServiceName, setNewServiceName] = useState('');
  const [productImageLabel, setProductImageLabel] = useState('Browse images');
  const [productBrochureLabel, setProductBrochureLabel] = useState('Browse PDF');

  const { activeTab, setActiveTab } = useOutletContext();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${"https://vovel-backend-4.onrender.com"}/api/products/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${"https://vovel-backend-4.onrender.com"}/api/products/${editingProduct.id}`, editingProduct);
      setEditingProduct(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;
    try {
      await axios.post("https://vovel-backend-4.onrender.com" + '/api/services', { name: newServiceName });
      setNewServiceName('');
      fetchData();
    } catch(err) { console.error(err); }
  };

  const handleEditServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${"https://vovel-backend-4.onrender.com"}/api/services/${editingService.id}`, editingService);
      setEditingService(null);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteService = async (id) => {
     if (window.confirm('Delete this service?')) {
        try {
           await axios.delete(`${"https://vovel-backend-4.onrender.com"}/api/services/${id}`);
           fetchData();
        } catch(err) { console.error(err); }
     }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://vovel-backend-4.onrender.com" + '/api/customers', newCustomer);
      setNewCustomer({ company: '', contact_person: '', email: '', phone: '' });
      fetchData();
    } catch(err) { console.error(err); }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Delete customer?')) {
      await axios.delete(`${"https://vovel-backend-4.onrender.com"}/api/customers/${id}`);
      fetchData();
    }
  };

  const handleBrochureUpload = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    if (!formData.get('file').name) {
       setUploadStatus('Please select a file.');
       return;
    }
    
    setUploadStatus('Uploading Brochure...');
    try {
      await axios.post("https://vovel-backend-4.onrender.com" + '/api/brochures', formData);
      setUploadStatus('Brochure uploaded successfully!');
      alert('Brochure uploaded successfully!');
      fetchData();
      form.reset();
      setTimeout(() => setUploadStatus(''), 3000);
    } catch(err) {
      console.error(err);
      setUploadStatus('Upload failed.');
    }
  };
  
  const handleDeleteBrochure = async (id) => {
     if(window.confirm('Delete this brochure?')) {
        await axios.delete(`${"https://vovel-backend-4.onrender.com"}/api/brochures/${id}`);
        fetchData();
     }
  };
  
  const handleSetActiveBrochure = async (id) => {
     await axios.put(`${"https://vovel-backend-4.onrender.com"}/api/brochures/${id}`, { is_active: true });
     fetchData();
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    setSettingsStatus('Saving...');
    try {
      await axios.put("https://vovel-backend-4.onrender.com" + '/api/settings', settings);
      setSettingsStatus('Settings updated successfully!');
      setTimeout(() => setSettingsStatus(''), 3000);
    } catch(err) {
      setSettingsStatus('Error updating settings.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("https://vovel-backend-4.onrender.com" + '/api/admin/stats').then(res => setStats(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/inquiries').then(res => setInquiries(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/products').then(res => setProducts(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/services').then(res => setServices(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/customers').then(res => setCustomers(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/gallery').then(res => setGallery(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/brochures').then(res => setBrochures(res.data)).catch(console.error);
    axios.get("https://vovel-backend-4.onrender.com" + '/api/settings').then(res => setSettings(res.data)).catch(console.error);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if(formData.material) data.append('material', formData.material);
    if(formData.warranty) data.append('warranty', formData.warranty);
    if(formData.usage) data.append('usage', formData.usage);

    const imageInput = document.getElementById('product-images');
    if (imageInput && imageInput.files.length > 0) {
       for (let i = 0; i < imageInput.files.length; i++) {
           data.append('images', imageInput.files[i]);
       }
    } else {
       setUploadStatus('Please select at least one image file.');
       return;
    }

    const brochureInput = document.getElementById('product-brochure');
    if (brochureInput && brochureInput.files.length > 0) {
        data.append('brochure', brochureInput.files[0]);
    }

    try {
      setUploadStatus('Uploading...');
      const token = localStorage.getItem('adminToken');
      const response = await fetch("https://vovel-backend-4.onrender.com" + '/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin-login');
        }
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Upload failed');
      }
      
      setUploadStatus('Product uploaded successfully!');
      alert('Product uploaded successfully!');
      setFormData({ name: '', category: 'Forklift', price: '', description: '', material: '', warranty: '', usage: '' });
      if (imageInput) imageInput.value = '';
      if (brochureInput) brochureInput.value = '';
      setProductImageLabel('Browse images');
      setProductBrochureLabel('Browse PDF');
      fetchData(); 
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (err) {
      setUploadStatus(err.message || 'Upload failed. Try again.');
    }
  };

  if (activeTab === 'Products') {
    return (
      <div className="admin-content">
        <div className="card-panel">
          <div className="card-header-actions">
             <h2 style={{margin: 0}}>Manage Products</h2>
             <button className="btn-primary" style={{display: 'flex', alignItems: 'center'}} onClick={() => setActiveTab('Dashboard')}>
               <Plus size={16} style={{marginRight: '6px'}} /> Add New Product
             </button>
          </div>
          
          <div className="table-responsive">
            <table className="admin-table modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th style={{textAlign: 'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...products].reverse().map(p => (
                  <tr key={p.id}>
                    <td><span className="id-badge">#{p.id}</span></td>
                    <td className="fw-600">{p.name}</td>
                    <td><span className="category-badge">{p.category}</span></td>
                    <td className="fw-500">₹{p.price ? p.price.toLocaleString() : 0}</td>
                    <td style={{textAlign: 'center'}}>
                      <div className="action-buttons">
                        <button onClick={() => setEditingProduct(p)} className="btn-icon btn-edit" title="Edit"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(p.id)} className="btn-icon btn-delete" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editingProduct && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
             <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '400px', margin: '0 15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                   <h2 style={{ margin: 0, color: '#041f4a' }}>Edit Product</h2>
                   <button onClick={() => setEditingProduct(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>X</button>
                </div>
                <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <label>Name</label>
                   <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} required style={{ padding: '8px', border: '1px solid #ccc' }} />
                   
                   <label>Category</label>
                   <input type="text" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} required style={{ padding: '8px', border: '1px solid #ccc' }} />
                   
                   <label>Price</label>
                   <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})} required style={{ padding: '8px', border: '1px solid #ccc' }} />
                   
                   <label>Material</label>
                   <input type="text" value={editingProduct.material || ''} onChange={e => setEditingProduct({...editingProduct, material: e.target.value})} placeholder="e.g. High Strength Steel" style={{ padding: '8px', border: '1px solid #ccc' }} />

                   <label>Warranty</label>
                   <input type="text" value={editingProduct.warranty || ''} onChange={e => setEditingProduct({...editingProduct, warranty: e.target.value})} placeholder="e.g. 1 Year Comprehensive" style={{ padding: '8px', border: '1px solid #ccc' }} />

                   <label>Usage</label>
                   <input type="text" value={editingProduct.usage || ''} onChange={e => setEditingProduct({...editingProduct, usage: e.target.value})} placeholder="e.g. Warehouse, Material Handling" style={{ padding: '8px', border: '1px solid #ccc' }} />

                   <label>Subtitle / Description</label>
                   <textarea value={editingProduct.subtitle || ''} onChange={e => setEditingProduct({...editingProduct, subtitle: e.target.value})} rows="3" style={{ padding: '8px', border: '1px solid #ccc' }}></textarea>
                   
                   <button type="submit" style={{ background: '#ff6b00', color: '#fff', border: 'none', padding: '10px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Save Changes</button>
                </form>
             </div>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'Inquiries') {
    return (
      <div className="admin-content">
        <div className="card-panel">
          <div className="card-header-actions">
             <h2 style={{margin: 0}}>Customer Inquiries (CRM)</h2>
          </div>
          
          <div className="table-responsive">
            <table className="admin-table modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name / Contact</th>
                  <th>Location</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{textAlign: 'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...inquiries].reverse().map(inq => (
                  <tr key={inq.id}>
                    <td><span className="id-badge">#{inq.id}</span></td>
                    <td>
                      <div className="fw-600">{inq.name}</div>
                      <div style={{fontSize: '0.8rem', color: '#666'}}>{inq.phone} | {inq.email}</div>
                    </td>
                    <td>{inq.location}</td>
                    <td style={{maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={inq.message}>{inq.message}</td>
                    <td>{inq.date}</td>
                    <td>
                      <span className={`category-badge ${inq.status === 'Resolved' ? 'status-active' : 'status-pending'}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <div className="action-buttons">
                        {inq.status !== 'Resolved' && (
                          <button onClick={async () => {
                            await axios.put(`${"https://vovel-backend-4.onrender.com"}/api/inquiries/${inq.id}`, {status: 'Resolved'});
                            fetchData();
                          }} className="btn-icon btn-edit" title="Mark as Resolved" style={{background: '#dcfce7', color: '#16a34a'}}>
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button onClick={async () => {
                           if(window.confirm('Delete this inquiry?')) {
                              await axios.delete(`${"https://vovel-backend-4.onrender.com"}/api/inquiries/${inq.id}`);
                              fetchData();
                           }
                        }} className="btn-icon btn-delete" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Services') {
    return (
      <div className="admin-content">
        <div className="dashboard-columns">
          <div className="card-panel">
            <div className="card-header-actions">
               <h2 style={{margin: 0}}>Manage Services</h2>
            </div>
            <div className="table-responsive">
              <table className="admin-table modern-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service Name</th>
                    <th style={{textAlign: 'center'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...services].reverse().map(s => (
                    <tr key={s.id}>
                      <td style={{width: '60px'}}><span className="id-badge">#{s.id}</span></td>
                      <td className="fw-600">{s.name}</td>
                      <td style={{textAlign: 'center', width: '120px'}}>
                        <div className="action-buttons">
                          <button onClick={() => setEditingService(s)} className="btn-icon btn-edit" title="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDeleteService(s.id)} className="btn-icon btn-delete" title="Delete"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
             <div className="card-panel">
               <h2><Plus size={20} color="#ff6b00" style={{marginRight: '8px'}} /> Add New Service</h2>
               <form onSubmit={handleAddService}>
                 <div className="form-group">
                   <label>Service Name</label>
                   <input type="text" value={newServiceName} onChange={e => setNewServiceName(e.target.value)} required placeholder="e.g. OMC Contracts" style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box'}} />
                 </div>
                 <button type="submit" className="btn-primary" style={{marginTop: '15px'}}>Publish Service</button>
               </form>
             </div>
          </div>
        </div>

        {editingService && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
             <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '400px', margin: '0 15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                   <h2 style={{ margin: 0, color: '#041f4a' }}>Edit Service</h2>
                   <button onClick={() => setEditingService(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>X</button>
                </div>
                <form onSubmit={handleEditServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <label>Service Name</label>
                   <input type="text" value={editingService.name} onChange={e => setEditingService({...editingService, name: e.target.value})} required style={{ padding: '8px', border: '1px solid #ccc' }} />
                   <button type="submit" style={{ background: '#ff6b00', color: '#fff', border: 'none', padding: '10px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>Save Changes</button>
                </form>
             </div>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'Customers') {
    return (
      <div className="admin-content">
        <div className="dashboard-columns">
          <div className="card-panel" style={{padding: '30px'}}>
            <h2 style={{margin: '0 0 20px 0', fontSize: '1.5rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Users size={24} color="#ff6b00" /> Customers Directory
            </h2>
            <div className="table-responsive">
              <table className="admin-table modern-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f8fafc', borderBottom: '2px solid #e2e8f0'}}>
                    <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>ID</th>
                    <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Company</th>
                    <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Contact Person</th>
                    <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Email / Phone</th>
                    <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Status</th>
                    <th style={{padding: '15px', textAlign: 'center', color: '#64748b', fontWeight: '600'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...customers].reverse().map(c => (
                    <tr key={c.id} style={{borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s'}}>
                      <td style={{padding: '15px'}}><span className="id-badge" style={{background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem'}}>#{c.id}</span></td>
                      <td className="fw-600" style={{padding: '15px', color: '#041f4a'}}>{c.company}</td>
                      <td style={{padding: '15px', color: '#334155'}}>{c.contact_person}</td>
                      <td style={{padding: '15px', fontSize: '0.85rem', color: '#64748b'}}>{c.email}<br/>{c.phone}</td>
                      <td style={{padding: '15px'}}><span className="status-active" style={{background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold'}}>{c.status}</span></td>
                      <td style={{padding: '15px', textAlign: 'center'}}>
                        <button onClick={() => handleDeleteCustomer(c.id)} className="btn-icon btn-delete" title="Delete" style={{background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s'}}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{padding: '30px', textAlign: 'center', color: '#94a3b8'}}>No customers found. Add a new customer to get started.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div>
             <div className="card-panel" style={{padding: '30px', background: '#f8fafc', border: '1px solid #e2e8f0'}}>
               <h2 style={{margin: '0 0 25px 0', fontSize: '1.3rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '8px'}}>
                 <Plus size={20} color="#ff6b00" /> Add New Customer
               </h2>
               <form onSubmit={handleAddCustomer} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                   <div>
                     <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Company Name</label>
                     <input type="text" value={newCustomer.company} onChange={e => setNewCustomer({...newCustomer, company: e.target.value})} required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. Acme Corp" />
                   </div>
                   <div>
                     <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Contact Person</label>
                     <input type="text" value={newCustomer.contact_person} onChange={e => setNewCustomer({...newCustomer, contact_person: e.target.value})} required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. John Doe" />
                   </div>
                   <div>
                     <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Email Address</label>
                     <input type="email" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="john@acme.com" />
                   </div>
                   <div>
                     <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Phone Number</label>
                     <input type="tel" value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="+91 XXXXX XXXXX" />
                   </div>
                 <button type="submit" className="btn-primary" style={{padding: '14px', fontSize: '1rem', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
                   <Save size={18} /> Save Customer
                 </button>
               </form>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'PDF Brochure') {
    return (
      <div className="admin-content">
        <div className="dashboard-columns">
          <div className="card-panel" style={{padding: '30px'}}>
             <h2 style={{margin: '0 0 25px 0', fontSize: '1.5rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '10px'}}>
               <FileText size={24} color="#ff6b00" /> Uploaded Brochures
             </h2>
             <div className="table-responsive">
               <table className="admin-table modern-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                 <thead>
                   <tr style={{background: '#f8fafc', borderBottom: '2px solid #e2e8f0'}}>
                     <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Title</th>
                     <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Date</th>
                     <th style={{padding: '15px', textAlign: 'left', color: '#64748b', fontWeight: '600'}}>Status</th>
                     <th style={{padding: '15px', textAlign: 'center', color: '#64748b', fontWeight: '600'}}>Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {[...brochures].reverse().map(b => (
                     <tr key={b.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                       <td className="fw-600" style={{padding: '15px', color: '#041f4a'}}>{b.title}</td>
                       <td style={{padding: '15px', color: '#64748b'}}>{b.date_uploaded}</td>
                       <td style={{padding: '15px'}}>
                         {b.is_active ? 
                           <span style={{background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'}}>Live</span> : 
                           <span style={{background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'}}>Inactive</span>
                         }
                       </td>
                       <td style={{padding: '15px', textAlign: 'center'}}>
                         <div className="action-buttons" style={{justifyContent: 'center'}}>
                           {!b.is_active && (
                             <button onClick={() => handleSetActiveBrochure(b.id)} className="btn-icon btn-edit" title="Set Active" style={{background: '#e0e7ff', color: '#4f46e5'}}><CheckCircle size={16} /></button>
                           )}
                           <a href={"https://vovel-backend-4.onrender.com" + b.file_url} target="_blank" rel="noreferrer" className="btn-icon" title="View PDF" style={{background: '#fef3c7', color: '#d97706', padding: '8px', borderRadius: '6px', display: 'inline-flex', marginLeft: '5px'}}><Link size={16} /></a>
                           <button onClick={() => handleDeleteBrochure(b.id)} className="btn-icon btn-delete" title="Delete" style={{marginLeft: '5px'}}><Trash2 size={16} /></button>
                         </div>
                       </td>
                     </tr>
                   ))}
                   {brochures.length === 0 && (
                     <tr>
                       <td colSpan="4" style={{padding: '30px', textAlign: 'center', color: '#94a3b8'}}>No brochures found. Upload one to get started.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
          <div>
            <div className="card-panel" style={{padding: '30px', background: '#f8fafc', border: '1px solid #e2e8f0'}}>
              <h2 style={{margin: '0 0 25px 0', fontSize: '1.3rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <UploadCloud size={20} color="#ff6b00" /> Upload New Brochure
              </h2>
              <form onSubmit={handleBrochureUpload} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Brochure Title</label>
                  <input type="text" name="title" required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. 2026 Product Catalog" />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Upload PDF File</label>
                  <div style={{position: 'relative', width: '100%', border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '20px', textAlign: 'center', background: '#fff', cursor: 'pointer'}}>
                     <UploadCloud size={24} color="#94a3b8" style={{marginBottom: '10px'}} />
                     <p style={{margin: 0, fontSize: '0.85rem', color: '#64748b'}}>Select PDF file (Max 10MB)</p>
                     <input type="file" name="file" accept="application/pdf" required style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}} />
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{padding: '14px', fontSize: '1rem', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
                  <UploadCloud size={18} /> Publish New Brochure
                </button>
                {uploadStatus && (
                  <div style={{width: '100%', padding: '10px', borderRadius: '8px', background: uploadStatus.includes('success') ? '#dcfce7' : '#f1f5f9', color: uploadStatus.includes('success') ? '#16a34a' : '#041f4a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.9rem'}}>
                    {uploadStatus.includes('success') && <CheckCircle size={16} />} {uploadStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Gallery') {
    return (
      <div className="admin-content">
        <div className="dashboard-columns">
          <div className="card-panel" style={{padding: '30px'}}>
            <h2 style={{margin: '0 0 25px 0', fontSize: '1.5rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '10px'}}>
               <Image size={24} color="#ff6b00" /> Media Gallery
            </h2>
            
            {gallery.length === 0 ? (
               <div style={{textAlign: 'center', padding: '50px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1'}}>
                 <Image size={48} color="#cbd5e1" style={{marginBottom: '15px'}}/>
                 <h3 style={{margin: '0 0 10px 0', color: '#334155'}}>No Images Found</h3>
                 <p style={{margin: 0, color: '#94a3b8'}}>Upload your first image from the panel on the right.</p>
               </div>
            ) : (
               <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px'}}>
                  {[...gallery].reverse().map(g => (
                    <div key={g.id} style={{border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transition: 'transform 0.2s'}} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                       <img src={g.image_url} alt={g.title} style={{width: '100%', height: '180px', objectFit: 'cover', display: 'block'}} />
                       <div style={{padding: '15px', background: '#fff', borderTop: '1px solid #f1f5f9'}}>
                          <h4 style={{margin: '0 0 8px 0', fontSize: '1.05rem', color: '#041f4a'}}>{g.title}</h4>
                          <span className="category-badge" style={{background: '#fff0e6', color: '#ff6b00', border: 'none', padding: '4px 10px', fontSize: '0.8rem'}}>{g.category}</span>
                       </div>
                       <button onClick={async () => {
                          if (window.confirm('Delete this image permanently?')) {
                             await axios.delete(`${"https://vovel-backend-4.onrender.com"}/api/gallery/${g.id}`);
                             fetchData();
                          }
                       }} style={{position: 'absolute', top: '12px', right: '12px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'background 0.2s'}} title="Delete Image" onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)'}>
                          <Trash2 size={16} />
                       </button>
                    </div>
                  ))}
               </div>
            )}
          </div>
          <div>
            <div className="card-panel" style={{padding: '30px', background: '#f8fafc', border: '1px solid #e2e8f0'}}>
              <h2 style={{margin: '0 0 25px 0', fontSize: '1.3rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <UploadCloud size={20} color="#ff6b00" /> Upload Media
              </h2>
              <form onSubmit={async (e) => {
                 e.preventDefault();
                 const formData = new FormData(e.target);
                 setUploadStatus('Uploading Image...');
                 try {
                   await axios.post("https://vovel-backend-4.onrender.com" + '/api/gallery', formData);
                   fetchData();
                   e.target.reset();
                   setUploadStatus('Image uploaded successfully!');
                   alert('Image uploaded successfully!');
                   setTimeout(() => setUploadStatus(''), 3000);
                 } catch (err) {
                   console.error("Gallery upload failed", err);
                   setUploadStatus('Upload failed.');
                 }
              }} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Image Title</label>
                  <input type="text" name="title" required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. Warehouse Expansion" />
                </div>
                <div>
                  <label style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}><span>Category</span> <span style={{fontSize: '0.75rem', color: '#ff6b00', fontWeight: 'normal'}}>Type to add new</span></label>
                  <input list="gallery-category-options" name="category" required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00', background: '#fff'}} placeholder="Select or type category..." />
                  <datalist id="gallery-category-options">
                     <option value="Projects & Installations" />
                     <option value="Machinery & Equipment" />
                     <option value="Our Facilities" />
                  </datalist>
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Upload File</label>
                  <div style={{position: 'relative', width: '100%', border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '20px', textAlign: 'center', background: '#fff', cursor: 'pointer'}}>
                     <UploadCloud size={24} color="#94a3b8" style={{marginBottom: '10px'}} />
                     <p style={{margin: 0, fontSize: '0.85rem', color: '#64748b'}}>Select an image file</p>
                     <input type="file" name="image" accept="image/*" required style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}} />
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{padding: '14px', fontSize: '1rem', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
                  <Save size={18} /> Upload Image
                </button>
                {uploadStatus && (
                  <div style={{width: '100%', padding: '10px', borderRadius: '8px', background: uploadStatus.includes('success') ? '#dcfce7' : '#f1f5f9', color: uploadStatus.includes('success') ? '#16a34a' : '#041f4a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.9rem'}}>
                    {uploadStatus.includes('success') && <CheckCircle size={16} />} {uploadStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Website Settings') {
    return (
      <div className="admin-content">
        <div className="card-panel" style={{maxWidth: '800px', margin: '0 auto', padding: '40px'}}>
          <h2 style={{margin: '0 0 30px 0', fontSize: '1.8rem', color: '#041f4a', borderBottom: '2px solid #f1f5f9', paddingBottom: '15px'}}>Global Website Settings</h2>
          
          <form onSubmit={handleSettingsUpdate}>
             <div style={{background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e2e8f0'}}>
                <h3 style={{marginTop: 0, marginBottom: '20px', color: '#ff6b00', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Building size={18} /> Corporate Information
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '20px'}}>
                   <div>
                      <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#041f4a', fontSize: '0.9rem'}}>Company Name</label>
                      <input type="text" value={settings.company_name} onChange={e => setSettings({...settings, company_name: e.target.value})} style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem', outlineColor: '#ff6b00'}} />
                   </div>
                </div>
             </div>

             <div style={{background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e2e8f0'}}>
                <h3 style={{marginTop: 0, marginBottom: '20px', color: '#ff6b00', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Phone size={18} /> Contact Details
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
                   <div>
                      <label style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px', fontWeight: '600', color: '#041f4a', fontSize: '0.9rem'}}><Phone size={14}/> Primary Phone</label>
                      <input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem', outlineColor: '#ff6b00'}} />
                   </div>
                   <div>
                      <label style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px', fontWeight: '600', color: '#041f4a', fontSize: '0.9rem'}}><Mail size={14}/> Support Email</label>
                      <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem', outlineColor: '#ff6b00'}} />
                   </div>
                   <div style={{gridColumn: '1 / -1'}}>
                      <label style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px', fontWeight: '600', color: '#041f4a', fontSize: '0.9rem'}}><MapPin size={14}/> Office Address</label>
                      <input type="text" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem', outlineColor: '#ff6b00'}} />
                   </div>
                </div>
             </div>

             <div style={{background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e2e8f0'}}>
                <h3 style={{marginTop: 0, marginBottom: '20px', color: '#ff6b00', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Link size={18} /> Social Media Links
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '20px'}}>
                   <div>
                      <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#041f4a', fontSize: '0.9rem'}}>LinkedIn URL</label>
                      <input type="text" value={settings.linkedin} onChange={e => setSettings({...settings, linkedin: e.target.value})} placeholder="https://linkedin.com/company/novel-enterprises" style={{width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem', outlineColor: '#ff6b00'}} />
                   </div>
                </div>
             </div>
             
             <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', padding: '20px', background: '#fff0e6', borderRadius: '8px'}}>
               {settingsStatus ? (
                 <span style={{fontWeight: 'bold', color: settingsStatus.includes('success') ? 'green' : '#041f4a', display: 'flex', alignItems: 'center', gap: '5px'}}>
                   {settingsStatus.includes('success') && <CheckCircle size={16} />} {settingsStatus}
                 </span>
               ) : (
                 <span style={{color: '#666', fontSize: '0.9rem'}}>Changes are immediately reflected on the live site.</span>
               )}
               <button type="submit" style={{background: '#041f4a', color: '#fff', padding: '14px 28px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 10px rgba(4,31,74,0.2)'}}>
                 <Save size={18} /> Save Settings
               </button>
             </div>
          </form>
        </div>
      </div>
    );
  }

  if (activeTab !== 'Dashboard') {
    return (
      <div className="admin-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <h2 style={{ fontSize: '2rem', color: '#041f4a', marginBottom: '10px' }}>{activeTab} Management</h2>
          <p>This administrative section is currently under development.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      {/* Stats */}
      <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px'}}>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #041f4a 0%, #0a3577 100%)', color: 'white', padding: '30px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 20px rgba(4,31,74,0.15)'}}>
          <div className="stat-icon" style={{background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '50%'}}><Package size={32} /></div>
          <div className="stat-info">
            <h3 style={{margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '500', opacity: 0.9}}>Total Products</h3>
            <div className="stat-value" style={{fontSize: '2.5rem', fontWeight: 'bold'}}>{stats.total_products}</div>
          </div>
        </div>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #ff6b00 0%, #ff8c3a 100%)', color: 'white', padding: '30px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 20px rgba(255,107,0,0.2)'}}>
          <div className="stat-icon" style={{background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '50%'}}><MessageSquare size={32} /></div>
          <div className="stat-info">
            <h3 style={{margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '500', opacity: 0.9}}>Customer Inquiries</h3>
            <div className="stat-value" style={{fontSize: '2.5rem', fontWeight: 'bold'}}>{stats.customer_inquiries}</div>
          </div>
        </div>
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', color: 'white', padding: '30px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 20px rgba(16,185,129,0.2)'}}>
          <div className="stat-icon" style={{background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '50%'}}><Users size={32} /></div>
          <div className="stat-info">
            <h3 style={{margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '500', opacity: 0.9}}>Total Visitors</h3>
            <div className="stat-value" style={{fontSize: '2.5rem', fontWeight: 'bold'}}>{stats.total_visitors}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-columns" style={{display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', alignItems: 'start'}}>
        {/* Left Col */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
          {/* Upload Form */}
          <div className="card-panel" style={{padding: '30px'}}>
            <h2 style={{margin: '0 0 25px 0', fontSize: '1.4rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '10px'}}><UploadCloud size={24} color="#ff6b00" /> Publish New Product</h2>
            <form onSubmit={handleUpload} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. Heavy Duty Pallet Truck" />
                </div>
                <div className="form-group">
                  <label style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}><span>Category</span> <span style={{fontSize: '0.75rem', color: '#ff6b00', fontWeight: 'normal'}}>Type to add new</span></label>
                  <input list="category-options" name="category" value={formData.category} onChange={handleInputChange} required style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="Select or type category..." />
                  <datalist id="category-options">
                    {['Forklift', 'Electric Stacker', 'Semi Electric', 'Hydraulic Stacker', 'Pallet Truck', 'Scissor Lift Table', 'Hydraulic Hose', 'EOT Crane', 'Forklift Spare Parts', 'Racking System'].map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. 150000" />
                </div>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Product Images (Select 2-3)</label>
                  <div style={{position: 'relative', width: '100%', border: productImageLabel !== 'Browse images' ? '1px solid #10b981' : '1px dashed #cbd5e1', borderRadius: '6px', padding: '10px', textAlign: 'center', background: productImageLabel !== 'Browse images' ? '#ecfdf5' : '#f8fafc', cursor: 'pointer', boxSizing: 'border-box'}}>
                     {productImageLabel !== 'Browse images' ? <CheckCircle size={20} color="#10b981" style={{marginRight: '8px', verticalAlign: 'middle'}} /> : <UploadCloud size={20} color="#94a3b8" style={{marginRight: '8px', verticalAlign: 'middle'}} />}
                     <span style={{fontSize: '0.9rem', color: productImageLabel !== 'Browse images' ? '#10b981' : '#64748b', fontWeight: productImageLabel !== 'Browse images' ? 'bold' : 'normal'}}>{productImageLabel}</span>
                     <input type="file" id="product-images" name="images" multiple accept="image/*" required style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}} onChange={(e) => {
                        if(e.target.files.length > 0) setProductImageLabel(`${e.target.files.length} images selected`);
                        else setProductImageLabel('Browse images');
                     }} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>PDF Brochure</label>
                  <div style={{position: 'relative', width: '100%', border: productBrochureLabel !== 'Browse PDF' ? '1px solid #10b981' : '1px dashed #cbd5e1', borderRadius: '6px', padding: '10px', textAlign: 'center', background: productBrochureLabel !== 'Browse PDF' ? '#ecfdf5' : '#f8fafc', cursor: 'pointer', boxSizing: 'border-box'}}>
                     {productBrochureLabel !== 'Browse PDF' ? <CheckCircle size={20} color="#10b981" style={{marginRight: '8px', verticalAlign: 'middle'}} /> : <UploadCloud size={20} color="#94a3b8" style={{marginRight: '8px', verticalAlign: 'middle'}} />}
                     <span style={{fontSize: '0.9rem', color: productBrochureLabel !== 'Browse PDF' ? '#10b981' : '#64748b', fontWeight: productBrochureLabel !== 'Browse PDF' ? 'bold' : 'normal'}}>{productBrochureLabel}</span>
                     <input type="file" id="product-brochure" name="brochure" accept="application/pdf" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}} onChange={(e) => {
                        if(e.target.files.length > 0) setProductBrochureLabel(`${e.target.files[0].name} selected`);
                        else setProductBrochureLabel('Browse PDF');
                     }} />
                  </div>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px'}}>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Material (Optional)</label>
                  <input type="text" name="material" value={formData.material} onChange={handleInputChange} style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. High Strength Steel" />
                </div>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Warranty (Optional)</label>
                  <input type="text" name="warranty" value={formData.warranty} onChange={handleInputChange} style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. 1 Year Comprehensive" />
                </div>
                <div className="form-group">
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Usage (Optional)</label>
                  <input type="text" name="usage" value={formData.usage} onChange={handleInputChange} style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00'}} placeholder="e.g. Warehouse, Industrial" />
                </div>
              </div>

              <div className="form-group">
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.9rem'}}>Description / Subtitle</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" style={{width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', outlineColor: '#ff6b00', resize: 'vertical'}} placeholder="Brief description of the product..."></textarea>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px'}}>
                <button type="submit" className="btn-primary" style={{padding: '12px 24px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '6px'}}><Save size={18}/> Publish Product</button>
                {uploadStatus && (
                  <span style={{color: uploadStatus.includes('success') ? '#16a34a' : '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', background: uploadStatus.includes('success') ? '#dcfce7' : '#fee2e2', padding: '8px 16px', borderRadius: '6px'}}>
                    {uploadStatus.includes('success') && <CheckCircle size={16} />} {uploadStatus}
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Chart Section */}
          <div className="card-panel" style={{padding: '30px'}}>
             <h2 style={{margin: '0 0 20px 0', fontSize: '1.4rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '10px'}}><BarChart2 size={24} color="#ff6b00" /> Inquiries Analytics</h2>
             <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <Bar 
                  options={{ responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, grid: { color: '#e2e8f0' } }, x: { grid: { display: false } } } }} 
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{ label: 'Monthly Leads', data: [12, 19, 15, 25, 22, inquiries.length || 5], backgroundColor: '#ff6b00', borderRadius: 4 }]
                  }} 
                />
             </div>
          </div>
          
          {/* Previews */}
          <div className="card-panel" style={{padding: '30px', overflow: 'hidden'}}>
            <h2 style={{margin: '0 0 25px 0', fontSize: '1.4rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '10px'}}><Package size={24} color="#ff6b00" /> Product Showcase Preview</h2>
            <div className="preview-grid" style={{display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '15px'}}>
              {[...products].reverse().slice(0,4).map(product => (
                <div key={product.id} className="preview-card" style={{minWidth: '220px', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)'}}>
                  <div className="preview-img" style={{height: '160px', background: '#f8fafc'}}>
                    <img src={product.image_url} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>
                  <div className="preview-details" style={{padding: '15px'}}>
                    <span style={{fontSize: '0.75rem', background: '#fff0e6', color: '#ff6b00', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>{product.category}</span>
                    <h4 style={{margin: '10px 0 5px 0', color: '#041f4a', fontSize: '1.05rem'}}>{product.name}</h4>
                    <div className="price" style={{color: '#64748b', fontWeight: '600', fontSize: '0.95rem'}}>₹{product.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
          <div className="card-panel" style={{padding: '30px', background: '#f8fafc'}}>
            <h2 style={{margin: '0 0 20px 0', fontSize: '1.4rem', color: '#041f4a', display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '15px', borderBottom: '2px solid #e2e8f0'}}>
              <Users size={24} color="#ff6b00" /> Recent Inquiries
            </h2>
            <div className="inquiry-list" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {inquiries.length === 0 ? (
                <div style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>No recent inquiries.</div>
              ) : inquiries.slice(0, 8).map(inq => (
                <div key={inq.id} className="inquiry-item" style={{background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #ff6b00', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'}}>
                  <div className="inquiry-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
                    <h4 style={{margin: 0, color: '#041f4a', fontSize: '1.05rem'}}>{inq.name}</h4>
                    <span style={{fontSize: '0.75rem', background: inq.status === 'Active' ? '#dcfce7' : '#f1f5f9', color: inq.status === 'Active' ? '#16a34a' : '#64748b', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold'}}>
                      {inq.status || 'New'}
                    </span>
                  </div>
                  <div style={{fontSize: '0.85rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Package size={14}/> {inq.service || 'General Inquiry'}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Phone size={14}/> {inq.phone}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><Mail size={14}/> {inq.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
