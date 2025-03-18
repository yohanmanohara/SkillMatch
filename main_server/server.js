require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const JobRoutes = require('./routes/JobRoutes');
const userRoutes = require('./routes/user');
const { containerClient } = require('./Connnections/azureBlobClient');  // Importing the containerClient

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());

app.use('/api/file', upload.single('file'), JobRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', JobRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

containerClient.getProperties()
  .then(() => {
    console.log('Connected to Azure Blob Storage');
  })
  .catch((error) => {
    console.error('Error connecting to Azure Blob Storage:', error);
  });

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
