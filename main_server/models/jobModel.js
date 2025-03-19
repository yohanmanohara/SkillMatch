const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  title: {
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

  benefits: {
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
  
  pictureurl :{
    type: String,
    required: true,
  },

  expiredate: {
    type: Date,
    required: true,
  },
  salaryMin :{
    type:Number,
    required: true,
  },
  salaryMax:{
    type:Number,
    required: true,

  },

   organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },


});

module.exports = mongoose.model('Jobs', JobSchema);
