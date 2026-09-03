import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#0f172a',
      color: '#94a3b8',
      textAlign: 'center',
      padding: '24px 20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      fontSize: '13px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>
          CareerPulse • University Mini Hackathon Project
        </p>
        <p style={{ color: '#64748b' }}>
          Built with MongoDB, Express.js, React & Node.js (MERN Stack)
        </p>
      </div>
    </footer>
  );
}