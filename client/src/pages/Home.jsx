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
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px',
        padding: '50px 30px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%'
        }} />

        <span style={{
          display: 'inline-block',
          background: 'rgba(59, 130, 246, 0.2)',
          color: '#60a5fa',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          ⚡ University Hackathon 2026 Edition
        </span>

        <h1 style={{ fontSize: '38px', color: 'white', fontWeight: 800, lineHeight: '1.2' }}>
          Elevate Your Career with <span style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CareerPulse</span>
        </h1>
        
        <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '14px auto 30px' }}>
          A unified, full-stack platform for exploring jobs, managing candidate applications, discovering industry partners, and reading authentic workplace insights.
        </p>

        {/* Live Counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          maxWidth: '650px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div><h2 style={{ color: '#60a5fa', margin: 0 }}>{stats.jobs}</h2><p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Active Jobs</p></div>
          <div><h2 style={{ color: '#34d399', margin: 0 }}>{stats.applications}</h2><p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Applications</p></div>
          <div><h2 style={{ color: '#fbbf24', margin: 0 }}>{stats.companies}</h2><p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Companies</p></div>
          <div><h2 style={{ color: '#f472b6', margin: 0 }}>{stats.reviews}</h2><p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Verified Reviews</p></div>
        </div>
      </div>

      {/* Module Navigation Cards */}
      <h2 style={{ marginTop: '50px', fontSize: '24px' }}>Explore Modules</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Access each team member's independent Full-Stack CRUD feature:</p>

      <div className="card-grid">
        <div className="card">
          <span style={{ fontSize: '28px' }}>💼</span>
          <h3 style={{ marginTop: '10px' }}>Jobs & Internships</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Explore curated vacancies, salary scales, and apply directly.</p>
          <Link to="/jobs" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>View Job Board →</Link>
        </div>

        <div className="card">
          <span style={{ fontSize: '28px' }}>📑</span>
          <h3 style={{ marginTop: '10px' }}>Candidate Applications</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Track real-time applicant hiring statuses and candidate resumes.</p>
          <Link to="/applications" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Manage Applications →</Link>
        </div>

        <div className="card">
          <span style={{ fontSize: '28px' }}>🏢</span>
          <h3 style={{ marginTop: '10px' }}>Company Profiles</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Directory of leading tech employers, locations, and headcounts.</p>
          <Link to="/companies" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Explore Directory →</Link>
        </div>

        <div className="card">
          <span style={{ fontSize: '28px' }}>⭐</span>
          <h3 style={{ marginTop: '10px' }}>Reviews & Ratings</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px' }}>Authentic employee feedback, star scores, and interview tips.</p>
          <Link to="/reviews" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Read Reviews →</Link>
        </div>
      </div>
    </div>
  );
}