const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const JobRoutes = require('./routes/JobRoutes');
const userRoutes = require('./routes/user');
const { s3Client, bucketName } = require('./Connnections/awsLightsailClient');
const savenoteRoutes = require('./routes/SaveNoteRoutes');
const analyticsRoutes = require('./routes/analyticsRoute');
const fetchUserIds = require('./utils/backgroudcalbookingstore');
const addeventRoutes = require('./routes/AddEventsRoutes');


dotenv.config();
const app = express();
const port = process.env.PORT || 3002;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());

app.use('/api/file', upload.single('file'), JobRoutes);
app.use('/api/user', userRoutes);
app.use('/api/savenotes', savenoteRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/addevent', addeventRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


s3Client.listObjectsV2({ Bucket: bucketName }, (err) => {
  if (err) {
    console.error('Error connecting to AWS Lightsail:', err);
  } else {
    console.log('Connected to AWS Lightsail storage');
  }
});

function repeatFetchUserIds() {
  setInterval(async () => {
      try {
          const userPairs = await fetchUserIds();
          console.log('User ID - calapikey pairs:', userPairs);
      } catch (error) {
          console.error('Error fetching user ID - calapikey pairs:', error);
      }
  }, 5000);  // runs every 5 seconds
}

repeatFetchUserIds();





app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});