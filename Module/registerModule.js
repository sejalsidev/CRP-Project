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
    }
}, { versionKey: false })
const register = mongoose.model("User", registerSchema)
module.exports = register
