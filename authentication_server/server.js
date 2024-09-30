require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const userRoutes = require('./routes/user');
const usejob = require('./routes/job');
const app = express()
app.use(cors()); 
app.use(express.json())



app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



app.use('/api/user', userRoutes);

app.use('/api/job',usejob);
  
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Mono db scussefully & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })


  console.log(`Server is running on port ${process.env.PORT}`);




