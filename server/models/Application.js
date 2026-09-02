const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidateName: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    appliedJobTitle: { type: String, required: true },
    portfolioUrl: { type: String, required: true },
    experienceYears: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Interview Scheduled', 'Accepted', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);