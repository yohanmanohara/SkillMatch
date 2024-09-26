const credentialProviderModel = require('../Models/CredentialProviderModel');
const BaseController = require('./BaseController');

class credentialProviderController extends BaseController {
    constructor() {
        super(credentialProviderModel);
    }

    async getSinglecredentialProvider(req, res) {
        try {
            const id = req.params.id;
            if (!this.validateId(id, res)) {
                return;
            }
            const organization = await this.getSingleItem(id, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllcredentialProviders(req, res) {
        await this.getAllItems(req, res);
    }

    async createNewcredentialProvider(req, res) {
        try {
            const data = req.body;
            const organization = await this.createNewItem(data, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatecredentialProvider(req, res) {
        try {
            const id = req.params.id;
            if (!this.validateId(id, res)) {
                return;
            }
            const data = req.body;
            const organization = await this.updateExistingItem(id, data, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteSinglecredentialProvider(req, res) {
        try {
            const id = req.params.id;
            if (!this.validateId(id, res)) {
                return;
            }
            const organization = await this.deleteSingleItem(id, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAllcredentialProviders(req, res) {
        try {
            const result = await this.deleteAllItems(req, res);
            res.status(200).json({ message: `${result.deletedCount} organizations deleted` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new credentialProviderController();
