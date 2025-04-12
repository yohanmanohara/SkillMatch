const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    autoIncrement: true,
    unique: true
  },
  userPicUrl: {
    type: String,
    required: false,
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
  
 cvUrl: { 
     type: [String],
      required: false,
      default: [],
    },

  appliedjobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' ,required: false}],

  savedjobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' ,required: false}],

  company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: false }], 



}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
