const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    materialStatus: {
        type: String,
        required: true
    },
    identityMark: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    caste: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    }
}, { versionKey: false })



const employee = mongoose.model('Employee', employeeSchema)

module.exports = employee  