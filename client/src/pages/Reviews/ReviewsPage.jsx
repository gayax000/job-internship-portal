import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import ReviewModal from './ReviewModal';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [filterRating, setFilterRating] = useState('All');

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingReview) {
        await axios.put(`${API_BASE_URL}/api/reviews/${editingReview._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/reviews`, formData);
      }
      setIsModalOpen(false);
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving review');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/reviews/${id}`);
        fetchReviews();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const filtered = reviews.filter(r => {
    if (filterRating === 'All') return true;
    return r.rating === Number(filterRating);
  });

  const averageRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>⭐ Company & Interview Reviews ({filtered.length})</h2>
          <p style={{ color: '#64748b' }}>Average Score: <strong>{averageRating} / 5.0</strong> across all reviews</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingReview(null); setIsModalOpen(true); }}>
          + Write a Review
        </button>
      </div>

      {/* Filter by Stars */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>Filter by Rating:</span>
        {['All', '5', '4', '3', '2', '1'].map(stars => (
          <button
            key={stars}
            onClick={() => setFilterRating(stars)}
            className="btn"
            style={{
              fontSize: '13px',
              padding: '6px 12px',
              background: filterRating === stars ? '#2563eb' : '#e2e8f0',
              color: filterRating === stars ? 'white' : '#334155'
            }}
          >
            {stars === 'All' ? 'All Ratings' : `${stars} Stars`}
          </button>
        ))}
      </div>

      {/* Review Cards Grid */}
      <div className="card-grid">
        {filtered.length === 0 ? (
          <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>No reviews found.</p>
        ) : (
          filtered.map(review => (
            <div key={review._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ color: '#1e293b' }}>{review.companyName}</h3>
                  <span style={{ fontSize: '14px' }}>{renderStars(review.rating)}</span>
                </div>
                <p style={{ color: '#2563eb', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>
                  👤 {review.reviewerRole}
                </p>
                <p style={{ color: '#334155', fontSize: '14px', margin: '12px 0', lineHeight: '1.4' }}>
                  "{review.reviewText}"
                </p>
                {review.interviewTips && (
                  <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#475569', marginBottom: '10px', borderLeft: '3px solid #2563eb' }}>
                    💡 <strong>Interview Tip:</strong> {review.interviewTips}
                  </div>
                )}
                {review.recommend ? (
                  <span style={{ fontSize: '12px', color: '#166534', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    ✓ Recommended
                  </span>
                ) : (
                  <span style={{ fontSize: '12px', color: '#991b1b', background: '#fee2e2', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    ✗ Not Recommended
                  </span>
                )}
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '15px', display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { setEditingReview(review); setIsModalOpen(true); }}>
                  Edit
                </button>
                <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleDelete(review._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingReview={editingReview}
      />
    </div>
  );
}