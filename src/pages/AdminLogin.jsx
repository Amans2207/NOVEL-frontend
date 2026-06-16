import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import axios from 'axios';
import SEO from '../components/SEO';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://vovel-backend-4.onrender.com" + '/api/admin/login', { username, password });
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Secure access for Novel Enterprises administrators." />
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f7fa', padding: '20px'}}>
        <div style={{backgroundColor: '#041f4a', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px', color: '#fff'}}>
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <div style={{display: 'inline-block', backgroundColor: '#fff', padding: '15px', borderRadius: '50%', marginBottom: '15px'}}>
              <Lock size={32} color="#ff6b00" />
            </div>
            <h1 style={{fontSize: '1.8rem', fontWeight: '700', marginBottom: '5px'}}>Admin Portal</h1>
            <p style={{color: '#aaa', fontSize: '0.9rem'}}>Please login to continue</p>
          </div>

          {error && <div style={{backgroundColor: 'rgba(255, 107, 0, 0.1)', color: '#ff6b00', padding: '10px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem', border: '1px solid #ff6b00'}}>{error}</div>}

          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc'}}>Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                style={{width: '100%', padding: '12px 15px', borderRadius: '6px', border: 'none', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none'}} 
                placeholder="Enter username" 
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc'}}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{width: '100%', padding: '12px 15px', borderRadius: '6px', border: 'none', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none'}} 
                placeholder="Enter password" 
              />
            </div>
            <button type="submit" style={{width: '100%', padding: '14px', borderRadius: '6px', border: 'none', backgroundColor: '#ff6b00', color: '#fff', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.3s'}}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
