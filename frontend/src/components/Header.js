import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const headerStyle = {
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    color: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background 0.3s'
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <BookOpen size={32} />
        <span>SEST SENAT</span>
      </div>
      
      {isAuthenticated && (
        <div style={userInfoStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} />
            <span>{user.name}</span>
            {user.role === 'admin' && (
              <span style={{ 
                background: '#fbbf24', 
                color: '#92400e', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem', 
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                ADMIN
              </span>
            )}
          </div>
          <button 
            style={buttonStyle}
            onClick={logout}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;