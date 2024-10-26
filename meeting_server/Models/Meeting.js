const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    jobid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    meetingid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meeting',
        required: true
    },
    description: {
        String
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    agenda: {
        type: String,
        required: true
    },
    attendees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    minutes: String,
    notes: String
});

const Meeting = mongoose.model('Meeitng', meetingSchema);

module.exports = Meeting;