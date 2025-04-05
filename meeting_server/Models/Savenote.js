const mongoose = require('mongoose');

const SavenoteSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Savenote', SavenoteSchema);