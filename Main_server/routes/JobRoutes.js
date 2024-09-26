const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobControllers');

router.get('/:id', (req, res) => JobController.getSingleJob(req, res));
router.get('', (req, res) => JobController.getAllJobs(req, res));
router.post('', (req, res) => JobController.createNewJob(req, res));
router.put('/:id', (req, res) => JobController.updateJob(req, res));
router.delete('/:id', (req, res) => JobController.deleteSingleJob(req, res));
router.delete('', (req, res) => JobController.deleteAllJobs(req, res));


router.get('/search', (req, res) => JobController.primaryJobSearch(req, res));
router.get('/primaryjobcard', (req, res) => JobController.primaryJobCard(req, res));
router.get('/secondaryjobcard', (req, res) => JobController.secondaryJobCard(req, res));
router.get('/jobdescription', (req, res) => JobController.jobDescription(req, res));



module.exports = router;
