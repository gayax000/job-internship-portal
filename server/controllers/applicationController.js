const Application = require('../models/Application');
 
// 1. Get all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// 2. Submit new application (Create)
exports.createApplication = async (req, res) => {
  try {
    const { candidateName, candidateEmail, appliedJobTitle, portfolioUrl, experienceYears } = req.body;
 
    // Backend Validation
    if (!candidateName || !candidateEmail || !appliedJobTitle || !portfolioUrl || experienceYears === undefined) {
      return res.status(400).json({ error: 'All fields are mandatory!' });
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address!' });
    }
 
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
// 3. Update application status (Update)
exports.updateApplication = async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
// 4. Delete application (Delete)
exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};