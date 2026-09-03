import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';

export default function Home() {
  const [stats, setStats] = useState({ jobs: 0, applications: 0, companies: 0, reviews: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [jobsRes, appsRes, compsRes, revsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/jobs`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/applications`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/companies`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/reviews`).catch(() => ({ data: [] }))
        ]);
        setStats({
          jobs: jobsRes.data.length,
          applications: appsRes.data.length,
          companies: compsRes.data.length,
          reviews: revsRes.data.length
        });
      } catch (err) { console.error(err); }
    };
    fetchCounts();
  }, []);

  return (
    <div className="container">
      {/* 🚀 Hero Section with Background Image & Live Stats */}
      <div className="hero-wrapper">
        <div className="pulse-badge">
          <span className="pulse-dot"></span>
          <span>⚡ 2026 Campus Career & Internship Network</span>
        </div>

        <h1 style={{ fontSize: '42px', color: 'white', fontWeight: 800, lineHeight: '1.2' }}>
          Discover Opportunities. Build Your Career with <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CareerPulse</span>
        </h1>
        
        <p style={{ color: '#cbd5e1', fontSize: '17px', maxWidth: '680px', margin: '16px auto 32px', lineHeight: '1.6' }}>
          The university's premier hub connecting students with verified internships, tracking candidate job applications in real-time, and sharing authentic interview insights.
        </p>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '35px' }}>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px', textDecoration: 'none' }}>
            🔍 Browse Active Jobs
          </Link>
          <Link to="/applications" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '15px', textDecoration: 'none', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
            📝 Submit Application
          </Link>
        </div>

        {/* Live Counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '16px',
          maxWidth: '720px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(12px)',
          padding: '18px 24px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <div><h2 style={{ color: '#60a5fa', margin: 0, fontSize: '28px' }}>{stats.jobs}</h2><p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Active Vacancies</p></div>
          <div><h2 style={{ color: '#34d399', margin: 0, fontSize: '28px' }}>{stats.applications}</h2><p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Applications</p></div>
          <div><h2 style={{ color: '#fbbf24', margin: 0, fontSize: '28px' }}>{stats.companies}</h2><p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Top Employers</p></div>
          <div><h2 style={{ color: '#f472b6', margin: 0, fontSize: '28px' }}>{stats.reviews}</h2><p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Verified Reviews</p></div>
        </div>
      </div>

      {/* 🧭 Platform Features / Modules */}
      <h2 style={{ marginTop: '55px', fontSize: '26px' }}>Explore Full-Stack Modules</h2>
      <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '24px' }}>Developed independently with dedicated CRUD operations and validation rules:</p>

      <div className="card-grid">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '32px' }}>💼</span>
            <span style={{ fontSize: '11px', background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>MEMBER 1</span>
          </div>
          <h3 style={{ marginTop: '12px' }}>Jobs & Internships</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Explore job openings with salary ranges, work locations, and direct application links.</p>
          <Link to="/jobs" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>View Job Board →</Link>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '32px' }}>📑</span>
            <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>MEMBER 2</span>
          </div>
          <h3 style={{ marginTop: '12px' }}>Applicant Tracking</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Track candidate submissions with live status updates (Under Review, Interview, Accepted).</p>
          <Link to="/applications" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Manage Applications →</Link>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '32px' }}>🏢</span>
            <span style={{ fontSize: '11px', background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>MEMBER 3</span>
          </div>
          <h3 style={{ marginTop: '12px' }}>Company Directory</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Discover registered industry partners across Technology, Finance, Healthcare, and E-commerce.</p>
          <Link to="/companies" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Explore Companies →</Link>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '32px' }}>⭐</span>
            <span style={{ fontSize: '11px', background: '#fdf2f8', color: '#db2777', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>MEMBER 4</span>
          </div>
          <h3 style={{ marginTop: '12px' }}>Reviews & Ratings</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Verified employee ratings, workplace culture feedback, and technical interview tips.</p>
          <Link to="/reviews" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Read Reviews →</Link>
        </div>
      </div>

      {/* 🛠️ How It Works Interactive Section */}
      <h2 style={{ marginTop: '60px', fontSize: '26px' }}>How CareerPulse Works</h2>
      <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '24px' }}>A streamlined 3-step lifecycle for university talent and recruiters:</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="step-card">
          <div className="step-number">1</div>
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Discover & Filter Roles</h4>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Filter hundreds of curated developer and intern positions matching your tech stack and salary preferences.</p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Submit & Track Online</h4>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Attach your portfolio, GitHub, and experience. Watch your status transition seamlessly from review to interview.</p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Share Authentic Insights</h4>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Give back to junior students by rating company interview processes and sharing preparation tips.</p>
          </div>
        </div>
      </div>
    </div>
  );
}