const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    dateSubmitted: {
        type: String,
        required: true,
    }
}, {
    versionKey: false
});

const feedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = { feedbackModel };
