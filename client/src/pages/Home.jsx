import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';

export default function Home() {
  const [stats, setStats] = useState({ jobs: 0, applications: 0, companies: 0, reviews: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [j, a, c, r] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/jobs`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/applications`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/companies`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/reviews`).catch(() => ({ data: [] }))
        ]);
        setStats({ jobs: j.data.length, applications: a.data.length, companies: c.data.length, reviews: r.data.length });
      } catch (err) { console.error(err); }
    };
    fetchCounts();
  }, []);

  return (
    <div className="container">
      {/* 🚀 Rich Gradient Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 50%, #0f172a 100%)',
        borderRadius: '24px',
        padding: '48px 32px',
        color: 'white',
        boxShadow: '0 20px 30px -10px rgba(30, 27, 75, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '36px'
      }}>
        {/* Subtle Background Lighting Glows */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%'
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.2)',
            color: '#a5b4fc',
            border: '1px solid rgba(165, 180, 252, 0.3)',
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '18px',
            backdropFilter: 'blur(8px)'
          }}>
            ⚡ Mini Hackathon 2026 Production Release
          </span>

          <h1 style={{ fontSize: '38px', color: '#ffffff', fontWeight: 800, lineHeight: '1.25', marginBottom: '14px' }}>
            Empowering Campus Talent with <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CareerPulse</span>
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: '1.6', marginBottom: '28px' }}>
            A unified full-stack MERN portal to discover verified vacancies, streamline candidate tracking, connect with partner companies, and share authentic workplace ratings.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/jobs" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '14.5px' }}>
              💼 Browse Active Vacancies
            </Link>
            <Link to="/applications" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '14.5px', background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
              📑 Candidate Tracker
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Rich Color Metric Stat Badges */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
        marginBottom: '40px'
      }}>
        {/* Metric 1 - Blue */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.08)'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}>
            💼
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#1e40af' }}>{stats.jobs}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>Active Jobs & Internships</div>
          </div>
        </div>

        {/* Metric 2 - Green */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
          border: '1px solid #a7f3d0',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.08)'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}>
            📑
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#065f46' }}>{stats.applications}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#059669' }}>Total Applications</div>
          </div>
        </div>

        {/* Metric 3 - Amber */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
          border: '1px solid #fde68a',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.08)'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)' }}>
            🏢
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#92400e' }}>{stats.companies}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#d97706' }}>Partner Companies</div>
          </div>
        </div>

        {/* Metric 4 - Rose */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)',
          border: '1px solid #fbcfe8',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 6px -1px rgba(244, 63, 94, 0.08)'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f43f5e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 10px rgba(244, 63, 94, 0.3)' }}>
            ⭐
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#9f1239' }}>{stats.reviews}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#e11d48' }}>Verified Reviews</div>
          </div>
        </div>
      </div>

      {/* 🎯 4 Member Color-Coded Modules */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', color: '#0f172a' }}>Core Architecture Modules</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Four independent full-stack CRUD sub-systems with individual validation and controllers:
        </p>
      </div>

      <div className="card-grid">
        {/* Module 1 - Blue/Indigo */}
        <div className="card" style={{ borderTop: '4px solid #4f46e5' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>💼</div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#4338ca', background: '#e0e7ff', padding: '4px 10px', borderRadius: '20px' }}>MEMBER 1</span>
            </div>
            <h3 style={{ color: '#1e1b4b', fontSize: '18px' }}>Jobs & Internships</h3>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
              Create and manage job postings with salary ranges, work types, and real-time search.
            </p>
          </div>
          <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '22px', width: '100%', background: 'linear-gradient(135deg, #4f46e5, #3b82f6)' }}>
            Manage Jobs Board →
          </Link>
        </div>

        {/* Module 2 - Emerald Green */}
        <div className="card" style={{ borderTop: '4px solid #10b981' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📑</div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#065f46', background: '#d1fae5', padding: '4px 10px', borderRadius: '20px' }}>MEMBER 2</span>
            </div>
            <h3 style={{ color: '#064e3b', fontSize: '18px' }}>Applicant Tracking</h3>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
              Submit candidate profiles, validate email/portfolio links, and update hiring stages.
            </p>
          </div>
          <Link to="/applications" className="btn btn-primary" style={{ marginTop: '22px', width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            Track Applications →
          </Link>
        </div>

        {/* Module 3 - Amber Orange */}
        <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🏢</div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#92400e', background: '#fef3c7', padding: '4px 10px', borderRadius: '20px' }}>MEMBER 3</span>
            </div>
            <h3 style={{ color: '#78350f', fontSize: '18px' }}>Company Directory</h3>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
              Manage employer partner profiles, employee counts, industry tags, and websites.
            </p>
          </div>
          <Link to="/companies" className="btn btn-primary" style={{ marginTop: '22px', width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            Explore Companies →
          </Link>
        </div>

        {/* Module 4 - Rose Pink */}
        <div className="card" style={{ borderTop: '4px solid #f43f5e' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>⭐</div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#9f1239', background: '#ffe4e6', padding: '4px 10px', borderRadius: '20px' }}>MEMBER 4</span>
            </div>
            <h3 style={{ color: '#881337', fontSize: '18px' }}>Reviews & Ratings</h3>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
              Submit verified company workplace ratings, star scores, and interview tips.
            </p>
          </div>
          <Link to="/reviews" className="btn btn-primary" style={{ marginTop: '22px', width: '100%', background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}>
            Read Reviews →
          </Link>
        </div>
      </div>
    </div>
  );
}