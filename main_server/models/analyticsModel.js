const mongoose = require('mongoose');

const ApplicationTrendSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: false
    },
    status: {
        type: String,
        enum: ['applied', 'interviewed', 'processed', 'offered', 'rejected', 'sorted', 'unsorted'],
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ApplicationTrend', ApplicationTrendSchema);