const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CareerPulse API!' });
});

// Member Routes සම්බන්ධ කරන තැන (පසුව එකතු කරමු)
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Connect Database & Start Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));