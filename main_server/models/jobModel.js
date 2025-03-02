const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
  },
  salary: {
    type: String, 
    required: true,
  },
  employmentTypes: {
    type: [String],
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
 
  location: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
    default: [],
  },

  desirable: {
    type: [String],
    required: true,
    default: [],
  },

  benifits: {
    type: [String],
    required: true,
    default: [],
  },
  
  expirienceduration: {
    type: Number,
    required: true,
  },

  educationlevel: {
    type: String,
    required: true,
  },
  
  logoId :{
    type: String,
    required: true,
  },

  expiredate: {
    type: Date,
    required: true,
  },


  date: {
    type: Date,
    default: Date.now,
  },


});

module.exports = mongoose.model('Job', JobSchema);
