import React, { useState, useEffect } from 'react';

export default function JobModal({ isOpen, onClose, onSave, editingJob }) {
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time', salary: '', description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingJob) setFormData(editingJob);
    else setFormData({ title: '', company: '', location: '', type: 'Full-time', salary: '', description: '' });
  }, [editingJob]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Job title is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.salary.trim()) errs.salary = 'Salary/Stipend is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editingJob ? 'Edit Job' : 'Post New Job / Internship'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="form-group">
            <label>Job Title</label>
            <input className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            {errors.title && <div className="error-text">{errors.title}</div>}
          </div>
          <div className="form-group">
            <label>Company</label>
            <input className="form-control" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            {errors.company && <div className="error-text">{errors.company}</div>}
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="form-control" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            {errors.location && <div className="error-text">{errors.location}</div>}
          </div>
          <div className="form-group">
            <label>Employment Type</label>
            <select className="form-control" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>
          <div className="form-group">
            <label>Salary / Stipend</label>
            <input className="form-control" placeholder="e.g. $2,000/mo or Rs. 80,000" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
            {errors.salary && <div className="error-text">{errors.salary}</div>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" className="form-control" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            {errors.description && <div className="error-text">{errors.description}</div>}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingJob ? 'Update Job' : 'Save Job'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}