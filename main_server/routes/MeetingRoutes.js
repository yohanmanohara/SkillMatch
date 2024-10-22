const express = require('express');
const router = express.Router();
const MeetingController = require('../controllers/MeetingControllers');

router.get(':id', (req, res) => MeetingController.getSingleMeeting(req, res));
router.get('', (req, res) => MeetingController.getAllMeetings(req, res));
router.post('', (req, res) => MeetingController.createNewMeeting(req, res));
router.put(':id', (req, res) => MeetingController.updateMeeting(req, res));
router.delete(':id', (req, res) => MeetingController.deleteSingleMeeting(req, res));
router.delete('', (req, res) => MeetingController.deleteAllMeetings(req, res));

module.exports = router;
