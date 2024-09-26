const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    logo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship'],
        required: true
    },
    modality: {
        type: String,
        enum: ['Remote', 'On-Site', 'Hybrid'],
        required: true
    },
    skills: {
        type: [String]
    },
    location: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    includeSalary: {
        type: Boolean,
        default: true 
    },
    currency: {
        type: String,
        required: true
    },
    paidEvery: {
        type: String,
        required: true
    },
    minSalary: {
        type: Number,
        required: true
    },
    maxSalary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'filled'],
        default: 'open'
    },
    timeStamp:{
        type: Date,
        default: Date.now
    }
});


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
 