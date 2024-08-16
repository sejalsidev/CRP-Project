const mongoose = require('mongoose')

const activitysection = mongoose.Schema({
    activityType: {
        type: String,
        required: true
    },
    activityDesc: {
        type: String,
        required: true
    },
    activityDate: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
const activity = mongoose.model('activitysec', activitysection)
module.exports = { activity }