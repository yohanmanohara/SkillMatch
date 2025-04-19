const mongoose = require('mongoose');

const appliedJobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['applied', 'interviewed', 'offered', 'rejected'],
    default: 'applied'

  },
  cvUrl : {
    type: String,
    required: true  
  },

 
});

const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);

module.exports = AppliedJob;
