const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyNo: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  socialMediaLinks: {
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  
  location: {
    type: String,
  },
  profilePic: {
    type: String, 
  },
  industry: {
    type: String,
  },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
