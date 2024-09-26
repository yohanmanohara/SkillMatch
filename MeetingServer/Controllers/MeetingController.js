const MeetingModel = require('../Models/Meeting');
const BaseController = require('./BaseController');

class MeetingController extends BaseController {
    constructor() {
        super(MeetingModel);
    }

    async getSingleMeeting(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }

    async getAllMeetings(req, res) {
        await this.getAllItems(req, res);
    }

    async createNewMeeting(req, res) {
        const data = req.body;
        await this.createNewItem(data, res);
    }

    async updateMeeting(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        const data = req.body;
        await this.updateExistingItem(id, data, res);
    }

    async deleteSingleMeeting(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.deleteSingleItem(id, res);
    }

    async deleteAllMeetings(req, res) {
        await this.deleteAllItems(req, res);
    }
}

module.exports = new MeetingController();
