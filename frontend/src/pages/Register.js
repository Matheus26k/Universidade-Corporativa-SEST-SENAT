import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Truck, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Register = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f172a 100%)',
    backgroundImage: `
      linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(30, 64, 175, 0.8) 100%),
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="trucks" patternUnits="userSpaceOnUse" width="200" height="200"><g opacity="0.1"><path d="M40,120 L60,120 L60,100 L100,100 L100,80 L140,80 L140,100 L160,100 L160,120 L180,120 L180,140 L160,140 L160,160 L140,160 L140,140 L60,140 L60,160 L40,160 Z" fill="%23ffffff"/><circle cx="70" cy="150" r="8" fill="%23ffffff"/><circle cx="150" cy="150" r="8" fill="%23ffffff"/><text x="110" y="95" font-family="Arial" font-size="8" fill="%23ffffff" text-anchor="middle">SEST</text><text x="110" y="105" font-family="Arial" font-size="8" fill="%23ffffff" text-anchor="middle">SENAT</text></g></pattern></defs><rect width="100%" height="100%" fill="url(%23trucks)"/></svg>')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '2rem',
    position: 'relative'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(30, 58, 138, 0.8)',
    zIndex: 1
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1.5rem',
    padding: '3rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '450px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    zIndex: 2
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '2rem',
    color: '#1e40af',
    fontSize: '1.75rem',
    fontWeight: 'bold'
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '2rem'
  };

  const inputGroupStyle = {
    position: 'relative',
    marginBottom: '1.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    outline: 'none'
  };

  const iconStyle = {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280'
  };

  const eyeIconStyle = {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280',
    cursor: 'pointer'
  };

  const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'transform 0.2s',
    marginBottom: '1rem'
  };

  const linkStyle = {
    textAlign: 'center',
    color: '#3b82f6',
    cursor: 'pointer',
    textDecoration: 'underline'
  };

  const errorStyle = {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    fontSize: '0.875rem'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register(formData);
      login(response.data.token, response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={cardStyle}>
        <div style={logoStyle}>
          <Truck size={32} />
          <span>SEST SENAT</span>
        </div>
        
        <h2 style={titleStyle}>Crie sua conta</h2>
        <p style={subtitleStyle}>Junte-se à nossa plataforma de aprendizado</p>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <User size={20} style={iconStyle} />
            <input
              type="text"
              placeholder="Seu nome completo"
              style={inputStyle}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            />
          </div>
          
          <div style={inputGroupStyle}>
            <Mail size={20} style={iconStyle} />
            <input
              type="email"
              placeholder="Seu email"
              style={inputStyle}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            />
          </div>
          
          <div style={inputGroupStyle}>
            <Lock size={20} style={iconStyle} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha (mín. 6 caracteres)"
              style={inputStyle}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            />
            <div style={eyeIconStyle} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          
          <button 
            type="submit" 
            style={buttonStyle}
            disabled={loading}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
        
        <p style={linkStyle} onClick={onToggleMode}>
          Já tem conta? Faça login aqui
        </p>
      </div>
    </div>
  );
};

export default Register;