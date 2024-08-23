const mongoose = require('mongoose')
const leaveSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Paid leave', 'Sick leave', 'Unpaid leave', 'Casual leave', 'Half leave'],
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
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        required: true
    }
})
const leave = mongoose.model('leaveapplication', leaveSchema)
module.exports = leave