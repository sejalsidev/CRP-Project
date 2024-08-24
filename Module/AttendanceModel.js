const mongoose = require('mongoose')
const attendanceSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    clockIn: {
        type: String,
        required: true
    },
    clockOut: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late', 'on leave'],
        required: true,
        default: 'present'
    },
    notes: {
        type: String,
        required: true
    }
})
const attendance = mongoose.model('attendance', attendanceSchema)
module.exports = { attendance }