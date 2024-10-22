// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const JobRoutes = require('./routes/JobRoutes');
const userRoutes = require('./routes/user');
// const JobSearch = require('./routes/JobRoutes');
// const OrganizationRoutes = require("./routes/OrganizationRoutes")
// const MeeitngRoutes = require('./routes/MeetingRoutes')

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/jobs', JobRoutes);
// app.use('/api/organization',OrganizationRoutes);
// app.use('/api/meetings', MeeitngRoutes);
// app.use('/api/jobsearch', JobSearch);
 app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`Connected to DB & listning on port: ${port}`);
  });
})
.catch((error) => {
  console.log(error);
})
