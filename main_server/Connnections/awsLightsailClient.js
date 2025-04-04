const AWS = require('aws-sdk');

const AWS_LIGHTSAIL_ENDPOINT = process.env.AWS_LIGHTSAIL_ENDPOINT;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Validate required environment variables
if (!AWS_LIGHTSAIL_ENDPOINT) {
  throw new Error('AWS_LIGHTSAIL_ENDPOINT is not set in the environment variables.');
}

if (!AWS_ACCESS_KEY_ID) {
  throw new Error('AWS_ACCESS_KEY_ID is not set in the environment variables.');
}

if (!AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS_SECRET_ACCESS_KEY is not set in the environment variables.');
}

if (!AWS_REGION) {
  throw new Error('AWS_REGION is not set in the environment variables.');
}

if (!AWS_BUCKET_NAME) {
  throw new Error('AWS_BUCKET_NAME is not set in the environment variables.');
}

// Configure AWS SDK for Lightsail
const s3Client = new AWS.S3({
  endpoint: AWS_LIGHTSAIL_ENDPOINT,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  s3ForcePathStyle: true, // Required for Lightsail
  signatureVersion: 'v4'
});

module.exports = {
  s3Client,
  bucketName: AWS_BUCKET_NAME
};