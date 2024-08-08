const express = require('express')
const { addTaskRequest } = require('../Controller/TaskRequestController')
const router = express.Router()

router.post("/addtask", addTaskRequest)

module.exports = router