const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({


  companuPicUrl: {
    type: String,
    required: true  
  },

  comapnyName: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true  
  },
  companyEmail: {
    type: String,
    required: true,
  },
  ContactNumber: {
    type: Number,
    required: true,
  },
  websiteUrl: {
    type: String,
  },

  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required
  },
  companyDescription: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
