const mongoose = require('mongoose');

const bookingItemSchema = new mongoose.Schema({
  bookingId: { type: Number },
  uid: { type: String },
  title: { type: String },
  description: { type: String, default: '' },
  status: { type: String },
  start: { type: Date },
  end: { type: Date },
  duration: { type: Number },
  meetingUrl: { type: String },
  location: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  cancellationReason: { type: String },
  cancelledByEmail: { type: String },
  metadata: { type: Object, default: {} },
  attendees: { type: Array, default: [] },
  guests: { type: Array, default: [] }
});

const bookingCollectionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookings: [bookingItemSchema], // Array of bookings
  error: { type: String } // For error cases
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingCollectionSchema);
module.exports = Booking;