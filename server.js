const express = require('express');
const { DataConnection } = require('./DatabaseConnection');
const user = require('./Router/registerRouter')
const employee = require('./Router/EmployeeRouter')
const feedback = require('./Router/FeedbackRouter')
const work = require('./Router/WorkHistoryRouter')
const taskrequest = require('./Router/TaskRequestRouter')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())

// set Router
app.use('/user', user)
app.use('/employee', employee)
app.use("/uploads", express.static("uploads"));
app.use('/feedback', feedback)
app.use('/workhistory', work)
app.use('/task', taskrequest)
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
