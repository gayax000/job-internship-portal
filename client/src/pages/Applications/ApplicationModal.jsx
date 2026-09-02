import React, { useState, useEffect } from 'react';
 
export default function ApplicationModal({ isOpen, onClose, onSave, editingApp }) {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    appliedJobTitle: '',
    portfolioUrl: '',
    experienceYears: '',
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    if (editingApp) setFormData(editingApp);
    else setFormData({
      candidateName: '', candidateEmail: '', appliedJobTitle: '', portfolioUrl: '', experienceYears: '', status: 'Pending'
    });
    setErrors({});
  }, [editingApp, isOpen]);
 
  if (!isOpen) return null;
 
  const validate = () => {
    const errs = {};
    if (!formData.candidateName.trim()) errs.candidateName = 'Candidate name is required';
    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.candidateEmail.trim()) {
      errs.candidateEmail = 'Email address is required';
    } else if (!emailRegex.test(formData.candidateEmail)) {
      errs.candidateEmail = 'Enter a valid email address (e.g. user@gmail.com)';
    }
 
    if (!formData.appliedJobTitle.trim()) errs.appliedJobTitle = 'Applied Job Position is required';
    if (!formData.portfolioUrl.trim()) errs.portfolioUrl = 'Portfolio / LinkedIn URL is required';
    if (formData.experienceYears === '' || formData.experienceYears < 0) {
      errs.experienceYears = 'Enter valid experience in years (0 or more)';
    }
 
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
<h3>{editingApp ? 'Update Application Details' : '📝 Submit Job Application'}</h3>
<form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
<div className="form-group">
<label>Full Name</label>
<input 
              className="form-control" 
              placeholder="e.g. Kasun Perera"
              value={formData.candidateName} 
              onChange={e => setFormData({...formData, candidateName: e.target.value})} 
            />
            {errors.candidateName && <div className="error-text">{errors.candidateName}</div>}
</div>
 
          <div className="form-group">
<label>Email Address</label>
<input 
              type="email"
              className="form-control" 
              placeholder="e.g. kasun@example.com"
              value={formData.candidateEmail} 
              onChange={e => setFormData({...formData, candidateEmail: e.target.value})} 
            />
            {errors.candidateEmail && <div className="error-text">{errors.candidateEmail}</div>}
</div>
 
          <div className="form-group">
<label>Applying For (Job Title)</label>
<input 
              className="form-control" 
              placeholder="e.g. Frontend Developer or UI Intern"
              value={formData.appliedJobTitle} 
              onChange={e => setFormData({...formData, appliedJobTitle: e.target.value})} 
            />
            {errors.appliedJobTitle && <div className="error-text">{errors.appliedJobTitle}</div>}
</div>
 
          <div className="form-group">
<label>Portfolio / LinkedIn / GitHub URL</label>
<input 
              className="form-control" 
              placeholder="https://linkedin.com/in/username"
              value={formData.portfolioUrl} 
              onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} 
            />
            {errors.portfolioUrl && <div className="error-text">{errors.portfolioUrl}</div>}
</div>
 
          <div className="form-group">
<label>Years of Experience</label>
<input 
              type="number"
              min="0"
              className="form-control" 
              placeholder="e.g. 1"
              value={formData.experienceYears} 
              onChange={e => setFormData({...formData, experienceYears: e.target.value})} 
            />
            {errors.experienceYears && <div className="error-text">{errors.experienceYears}</div>}
</div>
 
          {editingApp && (
<div className="form-group">
<label>Application Status</label>
<select 
                className="form-control" 
                value={formData.status} 
                onChange={e => setFormData({...formData, status: e.target.value})}
>
<option>Pending</option>
<option>Under Review</option>
<option>Interview Scheduled</option>
<option>Accepted</option>
<option>Rejected</option>
</select>
</div>
          )}
 
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
<button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
<button type="submit" className="btn btn-primary">{editingApp ? 'Update Application' : 'Submit Application'}</button>
</div>
</form>
</div>
</div>
  );
}