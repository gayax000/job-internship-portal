import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyModal from './CompanyModal';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/companies');
      setCompanies(res.data);
    } catch (err) {
      console.error('Error fetching companies:', err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingCompany) {
        await axios.put(`http://localhost:5000/api/companies/${editingCompany._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/companies', formData);
      }
      setIsModalOpen(false);
      setEditingCompany(null);
      fetchCompanies();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving company');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company profile?')) {
      try {
        await axios.delete(`http://localhost:5000/api/companies/${id}`);
        fetchCompanies();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filtered = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>🏢 Partner Companies ({filtered.length})</h2>
          <p style={{ color: '#64748b' }}>Explore top employers and industry leaders</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingCompany(null); setIsModalOpen(true); }}>
          + Add Company
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', gap: '15px', margin: '20px 0', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="form-control"
          style={{ flex: 1, minWidth: '220px' }}
          placeholder="🔍 Search company by name or location..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="form-control"
          style={{ width: '200px' }}
          value={selectedIndustry}
          onChange={e => setSelectedIndustry(e.target.value)}
        >
          <option value="All">All Industries</option>
          <option>Technology & IT</option>
          <option>Finance & Banking</option>
          <option>Healthcare</option>
          <option>Education</option>
          <option>E-commerce</option>
          <option>Other</option>
        </select>
      </div>

      {/* Company Cards Grid */}
      <div className="card-grid">
        {filtered.length === 0 ? (
          <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>No companies found matching your criteria.</p>
        ) : (
          filtered.map(company => (
            <div key={company._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '12px', background: '#dbeafe', color: '#1e40af', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {company.industry}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>👥 {company.employeeCount}+ Team</span>
                </div>
                <h3 style={{ marginTop: '10px', color: '#0f172a' }}>{company.name}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0' }}>📍 {company.location}</p>
                <p style={{ color: '#334155', fontSize: '14px', margin: '10px 0', lineHeight: '1.4' }}>{company.description}</p>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={company.website} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                  Visit Website ↗
                </a>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { setEditingCompany(company); setIsModalOpen(true); }}>
                    Edit
                  </button>
                  <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleDelete(company._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingCompany={editingCompany}
      />
    </div>
  );
}