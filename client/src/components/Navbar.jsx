import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      background: 'linear-gradient(90deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.25)'
    }}>
      <div style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0 20px',
        height: '68px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Brand Logo with Glow */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '800',
            fontSize: '18px',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
          }}>
            ⚡
          </div>
          <div>
            <span style={{ fontSize: '19px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
              Career<span style={{ color: '#818cf8' }}>Pulse</span>
            </span>
            <span style={{ display: 'block', fontSize: '10px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Campus Career Hub
            </span>
          </div>
        </Link>

        {/* Navigation Tabs with Active Glow Pill */}
        <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[
            { path: '/', label: 'Overview' },
            { path: '/jobs', label: '💼 Jobs' },
            { path: '/applications', label: '📑 Applications' },
            { path: '/companies', label: '🏢 Companies' },
            { path: '/reviews', label: '⭐ Reviews' }
          ].map(item => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  fontSize: '13.5px',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#ffffff' : '#cbd5e1',
                  background: active ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(59, 130, 246, 0.35))' : 'transparent',
                  border: active ? '1px solid rgba(129, 140, 248, 0.4)' : '1px solid transparent',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 0 12px rgba(99, 102, 241, 0.25)' : 'none'
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