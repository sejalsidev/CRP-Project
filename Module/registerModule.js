const mongoose = require('mongoose')
const registerSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'Users',
        enum: ['Admin', 'Users']
    }
}, { versionKey: false })
const register = mongoose.model("User", registerSchema)
module.exports = register
