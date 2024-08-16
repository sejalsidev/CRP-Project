const mongoose = require('mongoose')

const workallocateSchema = new mongoose.Schema({
    employeeId: {
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
        enum: ['pending', 'InProgress', 'completed'],
        default: 'pending',
        required: true
    },
    assignTask: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }

}, { versionKey: false })

const workAllocateModel = mongoose.model('workallocate', workallocateSchema)
module.exports = { workAllocateModel }