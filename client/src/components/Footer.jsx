import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '30px 20px',
      textAlign: 'center',
      fontSize: '13.5px',
      color: '#94a3b8'
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <p style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '6px', fontSize: '15px' }}>
          🚀 CareerPulse • University Mini Hackathon Project 2026
        </p>
        <p style={{ color: '#64748b' }}>
          Crafted with MongoDB Atlas, Express.js, React.js & Node.js • 4-Member Full-Stack Architecture
        </p>
      </div>
    </footer>
  );
}