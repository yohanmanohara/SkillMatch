const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const primaryJobSearchSchema = new Schema({
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
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    skills: {
        type: [String] // Assuming skills can be an array of strings
    },
    location: {
        type: String,
        required: true
    }

});


const primaryJobCardSchema = new Schema({
    logo: {
        type: String,
        required: true
    },
    icon: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    date: {
        type: String,
        required: true
    }

});

const secondaryJobCardSchema = new Schema({
    logo: {
        type: String,
        required: true
    },
    icon: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    date: {
        type: String,
        required: true
    }
});

const jobDescriptionSchema = new Schema({
    jobTitle:{
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    varified: {
        type: Boolean,
        required: true
    },
    favourite: {
        type: Boolean,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    datePosted: {
        type: String,
        required: true
    },
    applications: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
});


const primaryJobSearch = mongoose.model('primaryJobSearch', primaryJobSearchSchema);
const primaryJobCard = mongoose.model('primaryJobCard', primaryJobCardSchema);
const secondaryJobCard = mongoose.model('secondaryJobCard', secondaryJobCardSchema);
const jobDescription = mongoose.model('jobDescription', jobDescriptionSchema);

module.exports = primaryJobSearch;
module.exports = primaryJobCard;
module.exports = secondaryJobCard;
module.exports = jobDescription;