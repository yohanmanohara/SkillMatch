const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true
    },
  
    orgType: {
        type: String,
        enum: ['Corporation', 'Non-Profit', 'Government Agency']
    },
    
    orgaddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    orgEmail: {
        type: String,
        required: true
    },
    orgPhone: {
        type: String,
        required: true
    },
    jobid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    website: String,
    description: String,
    establishedDate: Date,
    
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;