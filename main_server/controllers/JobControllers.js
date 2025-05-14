const JobModel = require('../models/jobModel');
const userModel = require('../models/userModel');
const JobSuggestion = require('../models/jobsuggestions');
const BaseController = require('./BaseController');
const { s3Client, bucketName } = require('../Connnections/awsLightsailClient');
const axios = require('axios');
const FormData = require('form-data');

class cvController extends BaseController {

    async deleteFile(req, res) {
        const { id } = req.query;
        const { fileName } = req.body;
    
        console.log('Attempting to delete file...');
        console.log('User ID:', id);
        console.log('File name:', fileName);
    
        if (!s3Client) {
            console.error("S3 client is not initialized.");
            return res.status(500).json({ error: "AWS S3 client not initialized" });
        }
    
        if (!id || !fileName) {
            return res.status(400).json({ error: "Missing required parameters: id or fileName" });
        }
    
        const objectKey = `resume/${id}-${fileName}`;
    
        try {
            console.log(`Deleting object from S3: ${objectKey}`);
            
            await s3Client.deleteObject({
                Bucket: bucketName,
                Key: objectKey
            }).promise();
    
            console.log(`File ${objectKey} deleted successfully.`);
            return res.status(200).json({ message: "File deleted successfully" });
    
        } catch (error) {
            console.error("Error deleting file from S3:", error);
            return res.status(500).json({
                error: "File deletion failed",
                details: error.message
            });
        }
    }
    
    


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
                try {
                    const formData = new FormData();
                    formData.append('file', req.file.buffer, {
                        filename: req.file.originalname,
                        contentType: req.file.mimetype,
                    });                    
                    
                    const extractorResponse = await axios.post('http://flask_server:3003/process_cv', formData, {
                        headers: formData.getHeaders()
                    });

                
                    if (extractorResponse.status !== 200) {
                        console.error('Error processing CV:', extractorResponse.statusText);
                        return res.status(500).json({ error: 'CV processing failed' });
                    }
                
                    const extractedData = extractorResponse.data;   

                    console.log('Extracted data:', extractedData);

                    const { job_suggestions, processing_time, skills, status } = extractedData;

                    // Define the query to find similar document
                    const query = {
                      jobSuggestions: job_suggestions,
                      skills: skills,
                      processingTime: processing_time
                    };
                
                    const updatedOrCreated = await JobSuggestion.findByIdAndUpdate(
                        id, // The ID of the document to update
                        {
                            $set: {
                                jobSuggestions: job_suggestions,
                                skills: skills,
                                processingTime: processing_time,
                                status: status || 'success',
                                createdAt: new Date()
                            }
                        },
                        {
                            new: true,  // Returns the updated document
                            upsert: true // If the document doesn't exist, create it
                        }
                    );
                    
                    console.log('Updated or created document:', updatedOrCreated);
                   
                  return res.status(200)
                
                } catch (error) {
                    console.error('CV Processing Error:', error);
                    return res.status(500).json({ 
                        error: 'CV processing failed',
                        details: error.message
                    });
                }
    
        }
            
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

            const formData = new FormData();
            formData.append('file', req.file.buffer, {
                filename: req.file.originalname,
                contentType: req.file.mimetype,
            });                    
            
            const extractorResponse = await axios.post('http://flask_server:3003/process_cv', formData, {
                headers: formData.getHeaders()
            });

        
            if (extractorResponse.status !== 200) {
                console.error('Error processing CV:', extractorResponse.statusText);
                return res.status(500).json({ error: 'CV processing failed' });
            }
        
            const extractedData = extractorResponse.data;   

            console.log('Extracted data:', extractedData);

            const { job_suggestions, processing_time, skills, status } = extractedData;

            // Define the query to find similar document
            const query = {
              jobSuggestions: job_suggestions,
              skills: skills,
              processingTime: processing_time
            };
        
            const updatedOrCreated = await JobSuggestion.findByIdAndUpdate(
                id, // The ID of the document to update
                {
                    $set: {
                        jobSuggestions: job_suggestions,
                        skills: skills,
                        processingTime: processing_time,
                        status: status || 'success',
                        createdAt: new Date()
                    }
                },
                {
                    new: true,  // Returns the updated document 
                    upsert: true // If the document doesn't exist, create it
                }
            );
            
            console.log('Updated or created document:', updatedOrCreated);
            
              
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
        const { id } = req.query; 
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            console.log("Uploaded file:", req.file);

    
            if (!s3Client) {
                console.error("S3 client is not initialized.");
                return res.status(500).json({ error: "AWS S3 client not initialized" });
            }
    
            const objectKey = `${id}-${req.file.originalname}`;
    
            try {
                await s3Client.headObject({
                    Bucket: bucketName,
                    Key: objectKey
                }).promise();
                

                console.log(`File already exists: ${objectKey}`);
                const fileUrl = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
                console.log(`File uploaded successfully: ${fileUrl}`);
                return res.status(200).json({ url: fileUrl });
            } catch (error) {
                if (error.code === 'NotFound') {
                  
                    console.log(`File does not exist, uploading: ${objectKey}`);
                } else {
            

                    console.error("Error checking file existence:", error);
                    return res.status(500).json({ 
                        error: "Error checking file existence", 
                        details: error.message 
                    });
                }
  
            }

    
            console.log(`Uploading file ${objectKey} to AWS S3...`);
            const uploadResult = await s3Client.upload({
                Bucket: bucketName,
                Key: objectKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            }).promise();
    
            const fileUrl = uploadResult.Location; 
            console.log(`File uploaded successfully: ${fileUrl}`);
    
            return res.status(200).json({ url: fileUrl });
    
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
  