const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    email: String,
    name: String,
    timeZone: String,
    language: String,
    absent: Boolean
});

const hostSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    username: String,
    timeZone: String
});

const eventTypeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    slug: String,
    description: String,
    position: Number,
    // Add other eventType fields as needed
});

const bookingFieldsResponsesSchema = new mongoose.Schema({
    email: String,
    name: String,
    notes: String,
    guests: [String],
    location: mongoose.Schema.Types.Mixed
});

const bookingSchema = new mongoose.Schema({
    calId: { type: Number, required: true, unique: true },
    uid: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    duration: Number,
    status: String,
    cancellationReason: String,
    cancelledByEmail: String,
    eventTypeId: Number,
    eventType: eventTypeSchema,
    meetingUrl: String,
    location: String,
    absentHost: Boolean,
    hosts: [hostSchema],
    attendees: [attendeeSchema],
    guests: [String],
    bookingFieldsResponses: bookingFieldsResponsesSchema,
    metadata: mongoose.Schema.Types.Mixed,
    rating: Number,
    icsUid: String
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add indexes for better query performance
bookingSchema.index({ calId: 1 });
bookingSchema.index({ uid: 1 });
bookingSchema.index({ userId: 1 });
bookingSchema.index({ startTime: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);