const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('../models/Job');
const Application = require('../models/Application');
const Company = require('../models/Company');
const Review = require('../models/Review');

const sampleJobs = [
  {
    title: 'Junior React Frontend Developer',
    company: 'Virtusa',
    location: 'Colombo / Hybrid',
    type: 'Full-time',
    salary: 'Rs. 120,000 / month',
    description: 'Looking for a passionate React.js developer with knowledge in Tailwind CSS, REST APIs, and modern UI/UX design.'
  },
  {
    title: 'Software Engineering Intern (Node.js)',
    company: 'WSO2',
    location: 'Colombo',
    type: 'Internship',
    salary: 'Rs. 60,000 / month',
    description: '6-month internship for university undergraduates with solid understanding of JavaScript, Express.js, and MongoDB.'
  },
  {
    title: 'Full Stack MERN Developer',
    company: 'IFS Sri Lanka',
    location: 'Remote',
    type: 'Full-time',
    salary: 'Rs. 180,000 / month',
    description: 'Build enterprise-grade SaaS web applications using MongoDB, Express, React, and Node.js with CI/CD.'
  }
];

const sampleApplications = [
  {
    candidateName: 'Kasun Perera',
    candidateEmail: 'kasun.p@gmail.com',
    appliedJobTitle: 'Junior React Frontend Developer',
    portfolioUrl: 'https://github.com/kasun-dev',
    experienceYears: 1,
    status: 'Interview Scheduled'
  },
  {
    candidateName: 'Nimesha Fernando',
    candidateEmail: 'nimesha.f@gmail.com',
    appliedJobTitle: 'Software Engineering Intern (Node.js)',
    portfolioUrl: 'https://linkedin.com/in/nimesha-dev',
    experienceYears: 0,
    status: 'Under Review'
  },
  {
    candidateName: 'Amal Silva',
    candidateEmail: 'amal.silva@outlook.com',
    appliedJobTitle: 'Full Stack MERN Developer',
    portfolioUrl: 'https://amalsilva.tech',
    experienceYears: 2,
    status: 'Accepted'
  }
];

const sampleCompanies = [
  {
    name: 'WSO2',
    industry: 'Technology & IT',
    location: 'Colombo, Sri Lanka',
    website: 'https://wso2.com',
    employeeCount: 800,
    description: 'Open-source technology leader powering digital transformation with API management and cloud-native solutions.'
  },
  {
    name: 'IFS Sri Lanka',
    industry: 'Technology & IT',
    location: 'Orion City, Colombo',
    website: 'https://ifs.com',
    employeeCount: 1500,
    description: 'Global enterprise software company delivering leading ERP, FSM, and EAM solutions across multiple industries.'
  },
  {
    name: 'Commercial Bank',
    industry: 'Finance & Banking',
    location: 'Colombo, Sri Lanka',
    website: 'https://combank.lk',
    employeeCount: 3000,
    description: 'Largest private sector commercial bank in Sri Lanka with state-of-the-art fintech & online banking platforms.'
  }
];

const sampleReviews = [
  {
    companyName: 'WSO2',
    reviewerRole: 'Software Intern',
    rating: 5,
    reviewText: 'Great learning environment for interns. Senior engineers are extremely helpful and the tech stack is cutting-edge.',
    recommend: true,
    interviewTips: 'Review OOP concepts, async JavaScript, and Git branching workflows.'
  },
  {
    companyName: 'IFS Sri Lanka',
    reviewerRole: 'Associate Software Engineer',
    rating: 4,
    reviewText: 'Excellent work-life balance and supportive management. Good opportunities for international projects.',
    recommend: true,
    interviewTips: 'Prepare well for problem-solving questions and database design.'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear old data
    await Job.deleteMany();
    await Application.deleteMany();
    await Company.deleteMany();
    await Review.deleteMany();
    console.log('🧹 Old sample data cleared.');

    // Insert new sample data
    await Job.insertMany(sampleJobs);
    await Application.insertMany(sampleApplications);
    await Company.insertMany(sampleCompanies);
    await Review.insertMany(sampleReviews);

    console.log('✅ Sample Data successfully seeded for all 4 Modules!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();