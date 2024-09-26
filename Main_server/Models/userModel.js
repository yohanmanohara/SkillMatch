const mongoose = require('mongoose');
const { Schema, models } = mongoose;
const userSchema = new Schema(
    {
        authprivider:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CredentialProvider',
            required: true
        },
        firstname:
        {
            type:String,
            required:true
        },
        lastname:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:['employee','employer'],
            default:'employee',
            required:true   
        },
        organization:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
    }
    ,{
        timestamps:true,
        
    }
);

const User = models.User || mongoose.model("User",userSchema);
module.exports = User;