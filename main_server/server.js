const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const JobRoutes = require('./routes/JobRoutes');
const userRoutes = require('./routes/user');
const { s3Client, bucketName } = require('./Connnections/awsLightsailClient');
const savenoteRoutes = require('./routes/SaveNoteRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());

app.use('/api/file', upload.single('file'), JobRoutes);
app.use('/api/user', userRoutes);
app.use('/api/savenotes', savenoteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Test AWS Lightsail connection
s3Client.listObjectsV2({ Bucket: bucketName }, (err) => {
  if (err) {
    console.error('Error connecting to AWS Lightsail:', err);
  } else {
    console.log('Connected to AWS Lightsail storage');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});