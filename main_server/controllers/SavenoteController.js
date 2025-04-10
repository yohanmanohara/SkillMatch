const SavenoteModel = require('../models/Savenote');
const BaseController = require('./BaseController');

class SavenoteController extends BaseController {
    constructor() {
        super(SavenoteModel);
    }

    async saveNote(req, res) {
        const { notes, date, userId } = req.body;
        
        if (!notes || notes.trim() === "") {
            return res.status(400).json({ message: "Note cannot be empty" });
        }
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log(notes);

        const newNote = {
            id: Date.now(),
            date,
            text: notes,
            userId
        };
        
        try {
            const savedNote = await this.createNewItem(newNote, res);
            res.status(201).json(savedNote);
        } catch (error) {
            res.status(500).json({ message: "Error saving note", error });
        }
    }

    async deleteItem(req, res) {
        const { id } = req.params;  // Extract id from request params
        
        try {
            console.log(`Attempting to delete note with ID: ${id}`);
            
            const result = await SavenoteModel.findOneAndDelete({ id: Number(id) });
            
            if (!result) {
                console.log(`Note with ID ${id} not found`);
                return res.status(404).json({ message: "Note not found" });
            }
            
            console.log(`Successfully deleted note with ID: ${id}`);
            return res.status(200).json({ message: "Note deleted successfully" });
        } catch (error) {
            console.error(`Error deleting note ${id}:`, error);
            return res.status(500).json({ message: "Error deleting note", error: error.message });
        }
    }

    async getItemsByUser(userId) {
        try {
            // Implementation depends on your data structure
            // This is a simplified example assuming your model can query by userId
            const items = await this.model.find({ userId: userId });
            return items;
        } catch (error) {
            console.error("Error getting items by user:", error);
            throw error;
        }
    }
}

module.exports = new SavenoteController();