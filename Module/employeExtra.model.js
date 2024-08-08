const mongoose = require("mongoose")

const employeeExtraSchema = mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    medicalFitness: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    homeState: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    homeTown: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    homeDistict: {
        type: String,
        required: true
    },
    nearRailway: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    officeDesignation: {
        type: String,
        required: true
    },
    OfficeCadre: {
        type: String,
        required: true
    },
    currentOffice: {
        type: String,
        required: true
    },
    officeType: {
        type: String,
        required: true
    }
}, { versionKey: false })

const employeeExtra = mongoose.model('EmployeeExtra', employeeExtraSchema)

module.exports = employeeExtra