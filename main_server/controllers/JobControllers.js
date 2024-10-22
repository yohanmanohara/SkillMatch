const JobModel = require('../models/jobModel');
// const {primaryJobCard, secondaryJobCard, jobDescription} = require('../Models/jobSearch');
const BaseController = require('./BaseController');
const { validationResult, query } = require('express-validator');

class JobController extends BaseController {
    constructor() {
        super(JobModel);
    }

    async getSingleJob(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }

    async getAllJobs(req, res) {
        await this.getAllItems(req, res);
    }

    async createNewJob(req, res) {
        const data = req.body;
        await this.createNewItem(data, res);
    }

    async updateJob(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        const data = req.body;
        await this.updateExistingItem(id, data, res);
    }

    async deleteSingleJob(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.deleteSingleItem(id, res);
    }

    async deleteAllJobs(req, res) {
        await this.deleteAllItems(req, res);
    }

    // async primaryJobSearch(req, res) {
    //     try {
    //         // Extract search parameters, projection, page number, and page size from the query
    //         const { searchParams, projection, page = 1, limit = 10 } = req.query;
    
    //         // Parse the search parameters and projection if they are JSON strings
    //         const search = searchParams ? JSON.parse(searchParams) : {};
    //         const fields = projection ? JSON.parse(projection) : {};
    
    //         // Convert page and limit to integers
    //         const pageNumber = parseInt(page);
    //         const pageSize = parseInt(limit);
    
    //         // Calculate the number of documents to skip
    //         const skip = (pageNumber - 1) * pageSize;
    
    //         // Find the documents based on search parameters and projection, with pagination
    //         const data = await JobModel.find(search, fields)
    //                                    .skip(skip)
    //                                    .limit(pageSize);
            
    //         // Get the total count of documents matching the search criteria
    //         const total = await JobModel.countDocuments(search);
    
    //         // Send the response with the data and pagination info
    //         res.json({
    //             data,
    //             page: pageNumber,
    //             limit: pageSize,
    //             total,
    //             totalPages: Math.ceil(total / pageSize)
    //         });
    //     } catch (error) {
    //         // Handle errors and send a proper response
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    async primaryJobSearch(req, res) {
        const data = await JobModel.find(req.query)
        res.json(data);
    }
    

    async secondaryJobCard(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }
    async jobDescription(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }

    async jobSearch(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }

}

module.exports = new JobController();
