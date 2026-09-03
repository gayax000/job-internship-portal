import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '24px 20px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#64748b'
    }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>
          CareerPulse • University Mini Hackathon 2026
        </p>
        <p>Built with MongoDB, Express.js, React & Node.js (MERN Stack)</p>
      </div>
    </footer>
  );
}