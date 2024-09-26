const express = require('express');
const router = express.Router();
const InterviewController = require('../Controllers/MeetingController');

router.get('/:id', (req, res) => InterviewController.getSingleInterview(req, res));
router.get('', (req, res) => InterviewController.getAllInterviews(req, res));
router.post('', (req, res) => InterviewController.createNewInterview(req, res));
router.put('/:id', (req, res) => InterviewController.updateInterview(req, res));
router.delete('/:id', (req, res) => InterviewController.deleteSingleInterview(req, res));
router.delete('', (req, res) => InterviewController.deleteAllInterviews(req, res));





module.exports = router;
