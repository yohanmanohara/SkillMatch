const mongoose = require('mongoose');

const Schema = mongoose.Schema

const OrganizationSchema = new Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyPicUrl: {
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
    addedjobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false }], 
  

    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });



const Organization = mongoose.model('Organization', OrganizationSchema);



module.exports = Organization;
