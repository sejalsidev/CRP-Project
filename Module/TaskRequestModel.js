const mongoose = require('mongoose')

const taskRequestSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workhistory'
    },
    description: {
        type: String,
        required: true
    }
})
const taskRequest = mongoose.model('taskrequest', taskRequestSchema)
module.exports = { taskRequest }