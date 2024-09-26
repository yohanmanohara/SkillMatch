const mongoose = require('mongoose');

class BaseController {
    constructor(model) {
        this.model = model;
    }

    handleErrors(res, error) {
        res.status(500).json({ error: error.message });
    }

    validateId(id, res) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ error: "Invalid item id" });
            return false;
        }
        return true;
    }

    async getAllItems(req, res) {
        try {
            const items = await this.model.find();
            res.status(200).json({ items });
        } catch (error) {
            this.handleErrors(res, error);
        }
    }

    async getSingleItem(id, res) {
        try {
            const item = await this.model.findById(id);
            if (!item) {
                res.status(404).json({ error: "Item not found" });
            } else {
                res.status(200).json({ item });
            }
        } catch (error) {
            this.handleErrors(res, error);
        }
    }

    async createNewItem(data, res) {
        try {
            const item = await this.model.create(data);
            res.status(201).json({ item });
        } catch (error) {
            this.handleErrors(res, error);
        }
    }

    async updateExistingItem(id, data, res) {
        try {
            const updatedItem = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!updatedItem) {
                res.status(404).json({ error: "Item not found" });
            } else {
                res.status(200).json({ item: updatedItem });
            }
        } catch (error) {
            this.handleErrors(res, error);
        }
    }

    async deleteSingleItem(id, res) {
        try {
            const deletedItem = await this.model.findByIdAndDelete(id);
            if (!deletedItem) {
                res.status(404).json({ error: "Item not found" });
            } else {
                res.status(200).json({ message: "Item deleted successfully" });
            }
        } catch (error) {
            this.handleErrors(res, error);
        }
    }

    async deleteAllItems(req, res) {
        try {
            await this.model.deleteMany({});
            res.status(200).json({ message: "All items deleted successfully" });
        } catch (error) {
            this.handleErrors(res, error);
        }
    }
}

module.exports = BaseController;
