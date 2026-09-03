import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import ApplicationModal from './ApplicationModal';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingApp) {
        await axios.put(`${API_BASE_URL}/api/applications/${editingApp._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/applications`, formData);
      }
      setIsModalOpen(false);
      setEditingApp(null);
      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving application');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this application?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/applications/${id}`);
        fetchApplications();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': { bg: '#fef3c7', text: '#92400e' },
      'Under Review': { bg: '#e0e7ff', text: '#3730a3' },
      'Interview Scheduled': { bg: '#ede9fe', text: '#5b21b6' },
      'Accepted': { bg: '#dcfce7', text: '#166534' },
      'Rejected': { bg: '#fee2e2', text: '#991b1b' }
    };
    const style = colors[status] || { bg: '#f1f5f9', text: '#475569' };
    return (
      <span style={{ background: style.bg, color: style.text, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
        {status}
      </span>
    );
  };

  const filtered = applications.filter(app => {
    if (filterStatus === 'All') return true;
    return app.status === filterStatus;
  });

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>📑 Candidate Applications ({filtered.length})</h2>
          <p style={{ color: '#64748b' }}>Manage candidate submissions, status, and reviews</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingApp(null); setIsModalOpen(true); }}>
          + New Application
        </button>
      </div>

      {/* Filter by Status Bar */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>Filter by Status:</span>
        {['All', 'Pending', 'Under Review', 'Interview Scheduled', 'Accepted', 'Rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className="btn"
            style={{
              fontSize: '13px',
              padding: '6px 12px',
              background: filterStatus === status ? '#2563eb' : '#e2e8f0',
              color: filterStatus === status ? 'white' : '#334155'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table List View */}
      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
              <th style={{ padding: '12px' }}>Candidate Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Applied Role</th>
              <th style={{ padding: '12px' }}>Experience</th>
              <th style={{ padding: '12px' }}>Portfolio</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No applications found.</td>
              </tr>
            ) : (
              filtered.map(app => (
                <tr key={app._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{app.candidateName}</td>
                  <td style={{ padding: '12px', color: '#475569' }}>{app.candidateEmail}</td>
                  <td style={{ padding: '12px', color: '#2563eb', fontWeight: 500 }}>{app.appliedJobTitle}</td>
                  <td style={{ padding: '12px' }}>{app.experienceYears} Year(s)</td>
                  <td style={{ padding: '12px' }}>
                    <a href={app.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '13px' }}>
                      View Link
                    </a>
                  </td>
                  <td style={{ padding: '12px' }}>{getStatusBadge(app.status)}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { setEditingApp(app); setIsModalOpen(true); }}>
                        Edit
                      </button>
                      <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleDelete(app._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingApp={editingApp}
      />
    </div>
  );
}