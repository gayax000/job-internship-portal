const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  reviewerRole: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  recommend: { type: Boolean, default: true },
  interviewTips: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);