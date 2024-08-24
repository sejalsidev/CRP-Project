const express = require('express')
const { addAttendance, updateAttendance, deleteAttendance, getAttendance } = require('../Controller/AttendanceController')
const router = express.Router()

router.post('/add', addAttendance)
router.put('/update/:id', updateAttendance)
router.delete('/delete/:id', deleteAttendance)
router.get('/getattendance/:employeeId', getAttendance)

module.exports = router