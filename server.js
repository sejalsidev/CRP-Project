const express = require('express');
const { DataConnection } = require('./DatabaseConnection');
const user = require('./Router/registerRouter')
const employee = require('./Router/EmployeeRouter')
const feedback = require('./Router/FeedbackRouter')
const work = require('./Router/WorkallocateRouter')
const request = require('./Router/RequestsectionRouter')
const activity = require('./Router/ActivitysectionRouter')
const leave = require('./Router/LeaveRouter')
const cors = require('cors')
const app = express();
require('dotenv').config()

app.use(express.json())
app.use(cors())

// set Router
app.use('/user', user)
app.use('/employee', employee)
app.use("/uploads", express.static("uploads"));
app.use('/feedback', feedback)
app.use('/workallocate', work)
app.use('/requestsection', request)
app.use('/activitysection', activity)
app.use('/leave', leave)
app.get("/", (req, res) => {
    res.send("ok");
});

// -------------------------DB Connection----------------------
DataConnection().then(() => {
    app.listen(2000, () => {
        console.log('server running on port 2000');
    });
}).catch((e) => {
    console.log("Error", e);
});
