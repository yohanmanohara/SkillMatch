const mongoose = require('mongoose');

const jobSuggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jobSuggestions: [String],
  skills: [String],
  processingTime: { type: String, required: true },  // Changed to Number
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobSuggestion', jobSuggestionSchema);
