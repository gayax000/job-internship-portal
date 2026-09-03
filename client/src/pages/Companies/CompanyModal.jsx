import React, { useState, useEffect } from 'react';

export default function CompanyModal({ isOpen, onClose, onSave, editingCompany }) {
  const [formData, setFormData] = useState({
    name: '',
    industry: 'Technology & IT',
    location: '',
    website: '',
    employeeCount: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingCompany) {
      setFormData(editingCompany);
    } else {
      setFormData({
        name: '',
        industry: 'Technology & IT',
        location: '',
        website: '',
        employeeCount: '',
        description: ''
      });
    }
    setErrors({});
  }, [editingCompany, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Company name is required';
    if (!formData.location.trim()) errs.location = 'Location / City is required';
    if (!formData.website.trim()) errs.website = 'Website URL is required';
    
    if (!formData.employeeCount || formData.employeeCount < 1) {
      errs.employeeCount = 'Employee count must be at least 1';
    }

    if (!formData.description.trim()) {
      errs.description = 'Company description is required';
    } else if (formData.description.trim().length < 15) {
      errs.description = 'Description must be at least 15 characters';
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
        <h3>{editingCompany ? '🏢 Edit Company Profile' : '🏢 Register New Company'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          
          <div className="form-group">
            <label>Company Name</label>
            <input
              className="form-control"
              placeholder="e.g. Google, IFS, WSO2"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Industry</label>
            <select
              className="form-control"
              value={formData.industry}
              onChange={e => setFormData({ ...formData, industry: e.target.value })}
            >
              <option>Technology & IT</option>
              <option>Finance & Banking</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>E-commerce</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Headquarters / Location</label>
            <input
              className="form-control"
              placeholder="e.g. Colombo, Sri Lanka / Remote"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
            {errors.location && <div className="error-text">{errors.location}</div>}
          </div>

          <div className="form-group">
            <label>Website URL</label>
            <input
              className="form-control"
              placeholder="https://example.com"
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
            />
            {errors.website && <div className="error-text">{errors.website}</div>}
          </div>

          <div className="form-group">
            <label>Total Employees</label>
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="e.g. 250"
              value={formData.employeeCount}
              onChange={e => setFormData({ ...formData, employeeCount: e.target.value })}
            />
            {errors.employeeCount && <div className="error-text">{errors.employeeCount}</div>}
          </div>

          <div className="form-group">
            <label>About Company</label>
            <textarea
              rows="3"
              className="form-control"
              placeholder="Brief description of company services and culture..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <div className="error-text">{errors.description}</div>}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingCompany ? 'Update Company' : 'Save Company'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}