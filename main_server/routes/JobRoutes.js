const express = require('express');
const multer = require("multer");
const router = express.Router();

const JobController = require('../controllers/JobControllers');
const upload = multer({ storage: multer.memoryStorage() });
router.get('/:id', (req, res) => JobController.getSingleJob(req, res));
router.get('/', (req, res) => JobController.getAllJobs(req, res));
router.post('', (req, res) => JobController.createNewJob(req, res));
router.put('/:id', (req, res) => JobController.updateJob(req, res));
router.delete('/:id', (req, res) => JobController.deleteSingleJob(req, res));
router.delete('', (req, res) => JobController.deleteAllJobs(req, res));
router.post("/fileupload",(req, res) => JobController.fileUpload(req, res));

router.get('/jobsearch', (req, res) => JobController.primaryJobSearch(req, res));
module.exports = router;
