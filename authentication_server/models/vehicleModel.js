const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({

  name: { type: String, required: true },
  numberPlate: { type: String, required: true },
  status: {
    type: String,
    required: true
  },
  driverName: { type: String, required: true },
  iotid: { type: String, required: true },
  contactnumber: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

//   make: { type: String, required: true }, 
//   model: { type: String, required: true } 

}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;

