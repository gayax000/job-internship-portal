import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ background: '#1e293b', padding: '14px 20px', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🚀 CareerPulse
        </Link>
        <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
          <Link to="/" style={{ color: isActive('/') ? '#38bdf8' : '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
          <Link to="/jobs" style={{ color: isActive('/jobs') ? '#38bdf8' : '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>💼 Jobs</Link>
          <Link to="/applications" style={{ color: isActive('/applications') ? '#38bdf8' : '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>📑 Applications</Link>
          <Link to="/companies" style={{ color: isActive('/companies') ? '#38bdf8' : '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>🏢 Companies</Link>
          <Link to="/reviews" style={{ color: isActive('/reviews') ? '#38bdf8' : '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>⭐ Reviews</Link>
        </div>
      </div>
    </nav>
  );
}