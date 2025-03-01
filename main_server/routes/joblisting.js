const express = require("express");
const Job = require("../models/joblisting");

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// POST a new job
router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: "Failed to create job" });
  }
});

module.exports = router;
