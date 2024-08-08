const mongoose = require('mongoose')

const workHistroySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", 'In Progress', 'completed'],
        required: true
    },
    assignTask: {
        type: String,
        required: true
    }

}, { versionKey: false })

const workHistoryModel = mongoose.model('workhistory', workHistroySchema)
module.exports = { workHistoryModel }