const Job = require('../models/Job');

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Create job
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, type, salary, description } = req.body;
    if (!title || !company || !location || !salary || !description) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};