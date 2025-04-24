const EventModel = require('../models/Addevent');
const BaseController = require('./BaseController');

class EventController extends BaseController {
    constructor() {
        super(EventModel);
    }

    async addEvent(req, res) {
        const { title, date, time, userId } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title cannot be empty" });
        }

        if (!date || !time) {
            return res.status(400).json({ message: "Date and Time are required" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newEvent = {
            id: Date.now(),
            title,
            date,
            time,
            userId
        };

        try {
            const savedEvent = await this.createNewItem(newEvent, res);
            res.status(201).json(savedEvent);
        } catch (error) {
            res.status(500).json({ message: "Error adding event", error });
        }
    }

    async deleteEvent(req, res) {
        const { id } = req.params;

        try {
            console.log(`Attempting to delete event with ID: ${id}`);

            const result = await EventModel.findOneAndDelete({ id: Number(id) });

            if (!result) {
                return res.status(404).json({ message: "Event not found" });
            }

            return res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            console.error(`Error deleting event ${id}:`, error);
            return res.status(500).json({ message: "Error deleting event", error: error.message });
        }
    }

    async getEventsByUser(userId) {
        try {
            const events = await this.model.find({ userId: userId });
            return events;
        } catch (error) {
            console.error("Error getting events by user:", error);
            throw error;
        }
    }
}

module.exports = new EventController();
