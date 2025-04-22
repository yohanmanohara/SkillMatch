const mongoose = require('mongoose');

const SavenoteSchema = new mongoose.Schema({
   userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
   

    
}, {
    timestamps: true
});

module.exports = mongoose.model('Savenote', SavenoteSchema);