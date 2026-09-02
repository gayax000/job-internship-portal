const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: {
    type: String,
    enum: ['Technology & IT', 'Finance & Banking', 'Healthcare', 'Education', 'E-commerce', 'Other'],
    default: 'Technology & IT'
  },
  location: { type: String, required: true },
  website: { type: String, required: true },
  employeeCount: { type: Number, required: true, min: 1 },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);