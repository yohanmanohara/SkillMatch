const express = require('express');
const router = express.Router();
const TrendAnalysisController = require('../controllers/analyticsController');

// Get application trends
router.get('/', async (req, res) => {
    try {
        await TrendAnalysisController.getApplicationTrends(req, res);
    } catch (error) {
        console.error('Error in trend analysis route:', error);
        return res.status(500).json({ message: "Error processing trend analysis", error: error.message });
    }
});

module.exports = router;