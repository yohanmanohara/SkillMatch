const express = require('express');
const router = express.Router();
const SavenoteController = require('../Controllers/SavenoteController');

// Get all notes for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(`Received request to get notes for userId: ${userId}`);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    // Assuming you have a method to get items by user ID
    const notes = await SavenoteController.getItemsByUser(userId);
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notes", error });
  }
});

// Save a new note
router.post('/', SavenoteController.saveNote.bind(SavenoteController));

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
      await SavenoteController.deleteItem(req, res);
  } catch (error) {
      console.error('Route delete error:', error);
      return res.status(500).json({ message: "Error in route", error: error.message });
  }
});

module.exports = router;