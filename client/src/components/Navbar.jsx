import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '14px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '16px'
          }}>🚀</span>
          <span>Career<span style={{ color: '#60a5fa' }}>Pulse</span></span>
        </Link>

        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/jobs', label: '💼 Jobs' },
            { path: '/applications', label: '📑 Applications' },
            { path: '/companies', label: '🏢 Companies' },
            { path: '/reviews', label: '⭐ Reviews' }
          ].map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              style={{
                color: isActive(tab.path) ? '#ffffff' : '#94a3b8',
                background: isActive(tab.path) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                border: isActive(tab.path) ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '13px',
                padding: '6px 14px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}