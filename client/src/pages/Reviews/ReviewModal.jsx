import React, { useState, useEffect } from 'react';

export default function ReviewModal({ isOpen, onClose, onSave, editingReview }) {
  const [formData, setFormData] = useState({
    companyName: '',
    reviewerRole: '',
    rating: 5,
    reviewText: '',
    recommend: true,
    interviewTips: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingReview) {
      setFormData(editingReview);
    } else {
      setFormData({
        companyName: '',
        reviewerRole: '',
        rating: 5,
        reviewText: '',
        recommend: true,
        interviewTips: ''
      });
    }
    setErrors({});
  }, [editingReview, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.reviewerRole.trim()) errs.reviewerRole = 'Your role/job title is required';
    
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      errs.rating = 'Please provide a rating between 1 and 5';
    }

    if (!formData.reviewText.trim()) {
      errs.reviewText = 'Review description is required';
    } else if (formData.reviewText.trim().length < 10) {
      errs.reviewText = 'Review text must be at least 10 characters';
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
        <h3>{editingReview ? '⭐ Edit Company Review' : '⭐ Write a Company & Interview Review'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          
          <div className="form-group">
            <label>Company Name</label>
            <input
              className="form-control"
              placeholder="e.g. WSO2, IFS, 99x"
              value={formData.companyName}
              onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            />
            {errors.companyName && <div className="error-text">{errors.companyName}</div>}
          </div>

          <div className="form-group">
            <label>Your Role / Experience</label>
            <input
              className="form-control"
              placeholder="e.g. Software Engineering Intern / Candidate"
              value={formData.reviewerRole}
              onChange={e => setFormData({ ...formData, reviewerRole: e.target.value })}
            />
            {errors.reviewerRole && <div className="error-text">{errors.reviewerRole}</div>}
          </div>

          <div className="form-group">
            <label>Overall Rating (1 to 5 Stars)</label>
            <select
              className="form-control"
              value={formData.rating}
              onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
            >
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
              <option value="3">⭐⭐⭐ 3 - Average</option>
              <option value="2">⭐⭐ 2 - Below Average</option>
              <option value="1">⭐ 1 - Poor</option>
            </select>
            {errors.rating && <div className="error-text">{errors.rating}</div>}
          </div>

          <div className="form-group">
            <label>Workplace & Culture Review</label>
            <textarea
              rows="3"
              className="form-control"
              placeholder="Share your work experience, learning curve, and management culture..."
              value={formData.reviewText}
              onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
            />
            {errors.reviewText && <div className="error-text">{errors.reviewText}</div>}
          </div>

          <div className="form-group">
            <label>Interview Tips for Juniors (Optional)</label>
            <input
              className="form-control"
              placeholder="e.g. Focus on Data Structures, OOP, and React hooks"
              value={formData.interviewTips}
              onChange={e => setFormData({ ...formData, interviewTips: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <input
              type="checkbox"
              id="recommendCheck"
              checked={formData.recommend}
              onChange={e => setFormData({ ...formData, recommend: e.target.checked })}
            />
            <label htmlFor="recommendCheck" style={{ margin: 0, fontWeight: 500 }}>
              I recommend this company for internships/jobs
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingReview ? 'Update Review' : 'Submit Review'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}