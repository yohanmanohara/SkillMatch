const JobModel = require('../models/jobModel');
const userModel = require('../models/userModel');
const BaseController = require('./BaseController');
const { s3Client, bucketName } = require('../Connnections/awsLightsailClient');
const { v4: uuidv4 } = require('uuid');

const { validationResult, query } = require('express-validator');


class cvController extends BaseController {
  
    async cvUpload(req, res) {
        const { id } = req.query; 
        console.log('File received:', req.file);
        console.log('Request body:', req.body);
          console.log('Query parameters:', req.query);        
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
    
            console.log("Uploaded file:", req.file);
    
            if (!containerClient) {
                console.error("Container client is not initialized.");
                return res.status(500).json({ error: "Azure container client not initialized" });
            }
    
            const blobName = `${id}-${req.file.originalname}`; 
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
            try {
                await blockBlobClient.getProperties();
                console.log(`File already exists: ${blobName}`);
                return res.status(200).json({ url: blockBlobClient.url }); 
            } catch (error) {
                if (error.statusCode === 404) {
                    console.log(`File does not exist, uploading: ${blobName}`);
                } else {
                    console.error("Error checking file existence:", error);
                    return res.status(500).json({ error: "Error checking file existence", details: error.message });
                }
            }
    
            console.log(`Uploading file ${blobName} to Azure Blob Storage...`);
            await blockBlobClient.uploadData(req.file.buffer, {
                blobHTTPHeaders: { blobContentType: req.file.mimetype },
            });
    
            const fileUrl = blockBlobClient.url; 
            console.log(`File uploaded successfully: ${fileUrl}`);
    
            return res.status(200).json({ url: fileUrl });
    
        } catch (error) {
            console.error("Upload Error:", error); 
            return res.status(500).json({ error: "Upload failed", details: error.message }); 
        }
       
    }


}


class JobController extends BaseController {
    constructor() {
        super(JobModel);
    }
    async fileUpload(req, res) {
        const { id } = req.query; // Get the `id` from the query parameters
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            console.log("Uploaded file:", req.file);

            // Generate unique filename with original extension
            const fileExtension = req.file.originalname.split('.').pop();
            const objectKey = `${id}-${uuidv4()}.${fileExtension}`;

            const params = {
                Bucket: bucketName,
                Key: objectKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'public-read' // Adjust based on your requirements
            };

            // Check if file exists (optional)
            try {
                await s3Client.headObject({
                    Bucket: bucketName,
                    Key: objectKey
                }).promise();
                
                const url = `https://${bucketName}.${process.env.AWS_LIGHTSAIL_ENDPOINT}/${objectKey}`;
                return res.status(200).json({ url });
            } catch (error) {
                if (error.code !== 'NotFound') {
                    console.error("Error checking file existence:", error);
                    return res.status(500).json({ 
                        error: "Error checking file existence", 
                        details: error.message 
                    });
                }
                // File doesn't exist, proceed with upload
            }

            // Upload to Lightsail bucket
            console.log(`Uploading file ${objectKey} to AWS Lightsail...`);
            const uploadResult = await s3Client.upload(params).promise();

            console.log(`File uploaded successfully: ${uploadResult.Location}`);
            return res.status(200).json({ url: uploadResult.Location });

        } catch (error) {
            console.error("Upload Error:", error);
            return res.status(500).json({ 
                error: "Upload failed", 
                details: error.message 
            });
        }
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

module.exports = {
    JobController: new JobController(),
    cvController: new cvController()
  };
  