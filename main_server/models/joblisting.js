const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  logo: String,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
