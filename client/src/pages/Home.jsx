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
      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '20px auto 48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#eff6ff',
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: 600,
          padding: '4px 12px',
          borderRadius: '20px',
          marginBottom: '16px',
          border: '1px solid #dbeafe'
        }}>
          🎓 University Mini Hackathon 2026
        </div>

        <h1 style={{ fontSize: '38px', lineHeight: '1.25', marginBottom: '16px', color: '#0f172a' }}>
          Smart Campus Career & Internship Management Portal
        </h1>

        <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '28px' }}>
          A unified MERN stack application connecting undergraduates with top hiring employers, real-time application tracking, and authentic interview reviews.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: '10px 22px' }}>
            Explore Jobs & Internships →
          </Link>
          <Link to="/applications" className="btn btn-secondary" style={{ padding: '10px 22px' }}>
            Track Applications
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '48px'
      }}>
        {[
          { label: 'Active Opportunities', value: stats.jobs, color: '#2563eb', icon: '💼' },
          { label: 'Candidate Submissions', value: stats.applications, color: '#059669', icon: '📑' },
          { label: 'Partner Companies', value: stats.companies, color: '#d97706', icon: '🏢' },
          { label: 'Verified Reviews', value: stats.reviews, color: '#db2777', icon: '⭐' }
        ].map(item => (
          <div key={item.label} style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ fontSize: '24px', background: '#f8fafc', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: item.color }}>{item.value}</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 4 CRUD Modules Grid */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2>Core Project Modules</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
            Four independent full-stack CRUD features engineered with validation and persistent database storage:
          </p>
        </div>

        <div className="card-grid">
          {/* Module 1 */}
          <div className="card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>💼</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', background: '#eff6ff', padding: '3px 8px', borderRadius: '6px' }}>MEMBER 1</span>
              </div>
              <h3>Jobs & Internships</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
                Browse curated tech vacancies, salary stipends, job types, and search by keywords.
              </p>
            </div>
            <Link to="/jobs" className="btn btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
              Manage Jobs →
            </Link>
          </div>

          {/* Module 2 */}
          <div className="card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>📑</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>MEMBER 2</span>
              </div>
              <h3>Application Tracker</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
                Submit candidate resumes and monitor status transitions with instant status filters.
              </p>
            </div>
            <Link to="/applications" className="btn btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
              View Applications →
            </Link>
          </div>

          {/* Module 3 */}
          <div className="card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>🏢</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#d97706', background: '#fef3c7', padding: '3px 8px', borderRadius: '6px' }}>MEMBER 3</span>
              </div>
              <h3>Company Directory</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
                Directory of industry partners filtered by sector, employee headcount, and official websites.
              </p>
            </div>
            <Link to="/companies" className="btn btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
              Explore Companies →
            </Link>
          </div>

          {/* Module 4 */}
          <div className="card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>⭐</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#db2777', background: '#fdf2f8', padding: '3px 8px', borderRadius: '6px' }}>MEMBER 4</span>
              </div>
              <h3>Reviews & Insights</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
                Read authentic workplace culture feedback, star scores, and technical interview advice.
              </p>
            </div>
            <Link to="/reviews" className="btn btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
              Read Reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}