const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    autoIncrement: true,
    unique: true
  },
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: false
    
  },

  firstname:{
    type: String,
    required: false
  },
  lastname:{
    type: String,
    required  : false
  },
  contactnumber:{
    type: Number,
    required: false
  },
  country:{
    type: String,
    required: false

  },
  city:{
    type: String,
    required: false
  },

  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  savedjobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' ,required: false}],

  compan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' ,required: true}], 



}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
