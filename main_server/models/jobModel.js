const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  typeOfEmployment: {
    type: String, // e.g., "Full-time", "Part-time", "Contract"
    required: true,
  },
  salary: {
    type: String, // Can be adjusted to a Number if it's a fixed value
  },
  jobDescriptionShort: {
    type: String,
  },
  jobDescriptionLong: {
    experience: {
      type: String, // Experience requirements (e.g., "2-4 years")
    },
    requirements: {
      type: [String], // List of key requirements
    },
    desirable: {
      type: [String], // List of desirable skills/traits
    },
    benefits: {
      type: [String], // List of benefits provided
    },
    qualifications: {
      type: [String], // List of qualifications needed
    },
  },
  location: {
    type: String,
  },
  expireInDays: {
    type: Number, // Number of days until the job expires
  },
  fromOrganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Reference to an Organization collection
  },
  jobLevel: {
    type: String, // e.g., "Entry Level", "Mid Level", "Senior Level"
  },
});

module.exports = mongoose.model('Job', JobSchema);
