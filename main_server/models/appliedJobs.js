const mongoose = require('mongoose');

const appliedJobSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming there is a User model
    required: true
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // assuming there is an Organization model
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // assuming there is a Job model
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['applied', 'interviewing', 'offered', 'rejected', 'accepted'],
    default: 'applied'
  },
  resume: {
    type: String, // URL or path to the resume file
    required: true
  },
  coverLetter: {
    type: String // URL or path to the cover letter file
  },
  notes: {
    type: String
  }
});

const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);

module.exports = AppliedJob;
