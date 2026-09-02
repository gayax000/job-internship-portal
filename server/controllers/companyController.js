const Company = require('../models/Company');

// 1. Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Create new company
exports.createCompany = async (req, res) => {
  try {
    const { name, industry, location, website, employeeCount, description } = req.body;

    if (!name || !industry || !location || !website || !employeeCount || !description) {
      return res.status(400).json({ error: 'All company details are required!' });
    }

    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update company
exports.updateCompany = async (req, res) => {
  try {
    const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete company
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};