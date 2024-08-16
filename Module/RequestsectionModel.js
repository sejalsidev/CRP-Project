const mongoose = require('mongoose')

const requestSection = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    },
    status: {
        type: String,
        required: true,
        enum: ['Approve', 'Not-Approve', 'Cancel']
    },
    dateCreated: {
        type: String,
        required: true,
    },
    dateUpdated: {
        type: String,
        required: true
    },

})
const requestsection = mongoose.model('requestsection', requestSection)
module.exports = { requestsection }