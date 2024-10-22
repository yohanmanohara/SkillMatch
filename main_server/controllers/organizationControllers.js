const OrganizationModel = require('../Models/OrganizationModel');
const BaseController = require('./BaseController');

class OrganizationController extends BaseController {
    constructor() {
        super(OrganizationModel);
    }

    async getSingleOrganization(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        this.getSingleItem(id, res);
    }

    async getAllOrganizations(req, res) {
        this.getAllItems(req, res);
    }

    async createNewOrganization(req, res) {
        const data = req.body;
        this.createNewItem(data, res);
    }

    async updateOrganization(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        const data = req.body;
        this.updateExistingItem(id, data, res);
    }

    async deleteSingleOrganization(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        this.deleteSingleItem(id, res);
    }

    async deleteAllOrganizations(req, res) {
        this.deleteAllItems(req, res);
    }
}

module.exports = new OrganizationController();
