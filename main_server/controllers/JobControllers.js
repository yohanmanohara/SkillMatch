const JobModel = require('../models/jobModel');
const userModel = require('../models/userModel');
const BaseController = require('./BaseController');
const { s3Client, bucketName } = require('../Connnections/awsLightsailClient');


class cvController extends BaseController {
    async cvUpload(req, res) {
        const { id } = req.query;
        console.log('File received:', req.file);
        console.log('Query parameters:', req.query);
    
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
    
            if (!s3Client) {
                console.error("S3 client is not initialized.");
                return res.status(500).json({ error: "AWS S3 client not initialized" });
            }
    
            const prefix = `resume/${id}-`;
            const listedObjects = await s3Client.listObjectsV2({
                Bucket: bucketName,
                Prefix: prefix
            }).promise();
    
            if (listedObjects.Contents.length > 0) {
                // If there are existing resumes for this user, return the first one
                const existingKey = listedObjects.Contents[0].Key;
                const existingUrl = `https://${bucketName}.s3.amazonaws.com/${existingKey}`;
                console.log(`Resume already exists for user ${id}, returning URL.`);
                console.log(`File URL: ${existingUrl}`);

                return res.status(200).json({ 
                    url: existingUrl,
                    key: existingKey 
                });
            }
    
            // No existing file found — proceed to upload
            const objectKey = `resume/${id}-${req.file.originalname}`;
            console.log(`Uploading new resume for user ${id} to S3...`);
            const uploadResult = await s3Client.upload({
                Bucket: bucketName,
                Key: objectKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'private',
                Metadata: {
                    originalname: req.file.originalname,
                    uploadedAt: new Date().toISOString(),
                    userId: id
                }
            }).promise();
    
            console.log(`Resume uploaded successfully for user ${id}`);
            console.log(`File URL: ${uploadResult.Location}`);
            return res.status(200).json({ 
                url: uploadResult.Location,
                key: objectKey 
            });
    
        } catch (error) {
            console.error("Upload Error:", error);
            return res.status(500).json({ 
                error: "Upload failed", 
                details: error.message 
            });
        }
    }
    
    


    async getResume(req, res) {
        const { id } = req.query;
            
        try {
            if (!s3Client) {
                return res.status(500).json({ error: "AWS S3 client not initialized" });
            }

            const objectKey = `resume/${id}-${req.file.originalname}`;
            
            const url = s3Client.getSignedUrl('getObject', {
                Bucket: bucketName,
                Key: objectKey,
                Expires: 3600 // 1 hour
            });

            return res.status(200).json({ url });

        } catch (error) {
            if (error.code === 'NoSuchKey') {
                return res.status(404).json({ error: "Resume not found" });
            }
            console.error("Error getting resume:", error);
            return res.status(500).json({ 
                error: "Failed to get resume", 
                details: error.message 
            });
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

    
            if (!s3Client) {
                console.error("S3 client is not initialized.");
                return res.status(500).json({ error: "AWS S3 client not initialized" });
            }
    
            // Construct the object key using the `id` and the original filename
            const objectKey = `${id}-${req.file.originalname}`; // Append `id` to make the filename unique
    
            // Check if the file already exists in S3

            try {
                await s3Client.headObject({
                    Bucket: bucketName,
                    Key: objectKey
                }).promise();
                

                console.log(`File already exists: ${objectKey}`);
                const fileUrl = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
                console.log(`File uploaded successfully: ${fileUrl}`);
                return res.status(200).json({ url: fileUrl }); // Return the existing URL
            } catch (error) {
                if (error.code === 'NotFound') {
                    // File does not exist, proceed to upload it
                    console.log(`File does not exist, uploading: ${objectKey}`);
                } else {
                    // Some other error occurred (e.g., permission error)

                    console.error("Error checking file existence:", error);
                    return res.status(500).json({ 
                        error: "Error checking file existence", 
                        details: error.message 
                    });
                }
                // File doesn't exist, proceed with upload
            }

    
            // Upload to AWS S3 if the file doesn't exist
            console.log(`Uploading file ${objectKey} to AWS S3...`);
            const uploadResult = await s3Client.upload({
                Bucket: bucketName,
                Key: objectKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            }).promise();
    
            const fileUrl = uploadResult.Location; // Get the uploaded file URL
            console.log(`File uploaded successfully: ${fileUrl}`);
    
            return res.status(200).json({ url: fileUrl });
    
        } catch (error) {
            console.error("Upload Error:", error); // Log the full error stack
            return res.status(500).json({ 
                error: "Upload failed", 
                details: error.message 
            }); // Provide detailed error message in the response

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
  