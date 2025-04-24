const express = require('express');
const router = express.Router();
const AddeventController = require('../controllers/EventController');

// Get all events for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(`Received request to get events for userId: ${userId}`);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    // Assuming you have a method to get events by user ID
    const events = await AddeventController.getEventsByUser(userId);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching events", error });
  }
});

// Add a new event
router.post('/', AddeventController.addEvent.bind(AddeventController));

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    await AddeventController.deleteEvent(req, res);
  } catch (error) {
    console.error('Route delete error:', error);
    return res.status(500).json({ message: "Error in route", error: error.message });
  }
});

module.exports = router;
