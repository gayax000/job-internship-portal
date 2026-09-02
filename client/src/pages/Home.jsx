import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 style={{ fontSize: '36px', color: '#0f172a', marginBottom: '12px' }}>
        Welcome to <span style={{ color: '#2563eb' }}>CareerPulse</span> 🚀
      </h1>
      <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '650px', margin: '0 auto 30px' }}>
        Your all-in-one University Job & Internship Management Hub. Connect students with top employers, track applications, and share authentic career insights.
      </p>

      {/* 4 Modules Quick Cards */}
      <div className="card-grid" style={{ marginTop: '40px', textAlign: 'left' }}>
        <div className="card">
          <h3>💼 Jobs & Internships</h3>
          <p style={{ color: '#64748b', margin: '10px 0 15px', fontSize: '14px' }}>Browse curated tech vacancies and student internships.</p>
          <Link to="/jobs" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '13px' }}>Explore Jobs →</Link>
        </div>

        <div className="card">
          <h3>📑 Applications</h3>
          <p style={{ color: '#64748b', margin: '10px 0 15px', fontSize: '14px' }}>Submit and track your candidate applications status.</p>
          <Link to="/applications" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '13px' }}>View Applications →</Link>
        </div>

        <div className="card">
          <h3>🏢 Company Directory</h3>
          <p style={{ color: '#64748b', margin: '10px 0 15px', fontSize: '14px' }}>Explore partner companies and employer profiles.</p>
          <Link to="/companies" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '13px' }}>View Companies →</Link>
        </div>

        <div className="card">
          <h3>⭐ Reviews & Ratings</h3>
          <p style={{ color: '#64748b', margin: '10px 0 15px', fontSize: '14px' }}>Read verified interview tips and workplace feedback.</p>
          <Link to="/reviews" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '13px' }}>Read Reviews →</Link>
        </div>
      </div>
    </div>
  );
}