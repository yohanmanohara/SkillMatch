const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobControllers');


router.get('/', (req, res) => JobController.primaryJobSearch(req, res));
// router.get('/primaryjobcard', (req, res) => JobController.primaryJobCard(req, res));
// router.get('/secondaryjobcard', (req, res) => JobController.secondaryJobCard(req, res));
// router.get('/jobdescription', (req, res) => JobController.jobDescription(req, res));



module.exports = router;
