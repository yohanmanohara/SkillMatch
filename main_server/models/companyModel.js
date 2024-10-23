const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true
    },
    jobid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orgType: {
        type: String,
        enum: ['Corporation', 'Non-Profit', 'Government Agency']
    },
    industry: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    website: String,
    description: String,
    logo: String, // Assuming you store the path or URL of the uploaded logo
    establishedDate: Date,
    socialMedia: String,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
