const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const savenoteRoutes = require('./Routes/SaveNoteRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3003;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());

app.use('/api/savenotes', savenoteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
