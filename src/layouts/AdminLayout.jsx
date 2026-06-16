import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Wrench, Image, FileText, MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import '../pages/AdminDashboard.css';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', icon: <Package size={20} /> },
    { name: 'Services', icon: <Wrench size={20} /> },
    { name: 'Gallery', icon: <Image size={20} /> },
    { name: 'PDF Brochure', icon: <FileText size={20} /> },
    { name: 'Inquiries', icon: <MessageSquare size={20} /> },
    { name: 'Customers', icon: <Users size={20} /> },
    { name: 'Website Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <span>NOVEL</span> <span>ADMIN</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button 
              key={item.name} 
              onClick={() => setActiveTab(item.name)}
              className={`sidebar-link ${activeTab === item.name ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
        <div style={{padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <Link to="/" className="sidebar-link" style={{color: '#ff6b00'}}><LogOut size={20} /> Logout</Link>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-topbar">
          <h1>{activeTab}</h1>
          <div style={{color: '#666', fontWeight: '500'}}>Welcome, Admin</div>
        </header>
        
        <Outlet context={{ activeTab, setActiveTab }} />
      </main>
    </div>
  );
};

export default AdminLayout;
