const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    companuPicUrl: {
    type: String,
    required: true,
  },
  comapnyName: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  
  contactnumber: {
    type: String,
    required: true,
  },

  websiteUrl: {
    type: String,
    required: true,

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

   companyDescription: {
        type: String,
        required: true,
  },

    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
