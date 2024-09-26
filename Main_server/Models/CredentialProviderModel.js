const mongoose = require('mongoose');

const CredentialPrivider = new mongoose.Schema({
    MongoDBID: {
        type: String,
        required: true
    },
    GoogleID: {
        type: String,
        required: true
    },
    ZoomID: {
        type: String,
        required: true
    },
    LinkedInID: {
        type: String,
        required: true
    }

});

const Credentials = mongoose.model('Meeitng', CredentialPrivider);

module.exports = Credentials;