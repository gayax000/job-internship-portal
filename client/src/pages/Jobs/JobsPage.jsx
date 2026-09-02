import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobModal from './JobModal';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleSave = async (formData) => {
    try {
      if (editingJob) {
        await axios.put(`http://localhost:5000/api/jobs/${editingJob._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/jobs', formData);
      }
      setIsModalOpen(false);
      setEditingJob(null);
      fetchJobs();
    } catch (err) { alert(err.response?.data?.error || 'Error saving job'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        fetchJobs();
      } catch (err) { console.error(err); }
    }
  };

  const filtered = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>💼 Jobs & Internships ({filtered.length})</h2>
          <p style={{ color: '#64748b' }}>Explore and manage career opportunities</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingJob(null); setIsModalOpen(true); }}>
          + Post New Job
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="🔍 Search jobs by title or company..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="card-grid">
        {filtered.map(job => (
          <div key={job._id} className="card">
            <span style={{ fontSize: '12px', background: '#e0e7ff', color: '#3730a3', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
              {job.type}
            </span>
            <h3 style={{ marginTop: '8px', color: '#1e293b' }}>{job.title}</h3>
            <p style={{ fontWeight: 600, color: '#2563eb' }}>{job.company} • 📍 {job.location}</p>
            <p style={{ color: '#059669', fontWeight: 600, margin: '6px 0' }}>💰 {job.salary}</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>{job.description}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
              <button className="btn btn-secondary" onClick={() => { setEditingJob(job); setIsModalOpen(true); }}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <JobModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        editingJob={editingJob} 
      />
    </div>
  );
}