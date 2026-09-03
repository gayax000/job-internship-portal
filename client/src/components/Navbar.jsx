import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1140px',
        margin: '0 auto',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '800',
            fontSize: '16px'
          }}>
            C
          </div>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>
            Career<span style={{ color: '#2563eb' }}>Pulse</span>
          </span>
        </Link>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {[
            { path: '/', label: 'Overview' },
            { path: '/jobs', label: 'Jobs' },
            { path: '/applications', label: 'Applications' },
            { path: '/companies', label: 'Companies' },
            { path: '/reviews', label: 'Reviews' }
          ].map(item => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#2563eb' : '#64748b',
                  background: active ? '#eff6ff' : 'transparent',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}