const express = require('express');
const router = express.Router();
const ApplicationAnalyticsController = require('../controllers/ApplicationAnalyticsController');

// Get application statistics
router.get('/applications', async (req, res) => {
  try {
    console.log('Analytics route called with query:', req.query);
    await ApplicationAnalyticsController.getApplicationStats(req, res);
  } catch (error) {
    console.error('Error in analytics route:', error);
    return res.status(500).json({ 
      message: "Error processing analytics request", 
      error: error.message 
    });
  }
});

module.exports = router;