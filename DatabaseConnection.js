const mongoose = require("mongoose")
let DataConnection = () => mongoose.connect("mongodb://127.0.0.1:27017/CRP").then(() => {
    try {
        console.log("Database connected")
    } catch (error) {
        console.log("Database not connected")
    }

}).catch(() => {
    console.log("Error connection to database")
})
module.exports = { DataConnection }
