const express = require('express')
const { leavePost, leaveUpdate, leaveDelete, getLeave } = require('../Controller/LeaveController')
const router = express.Router()

router.post('/add', leavePost)
router.put('/update/:id', leaveUpdate)
router.delete('/delete/:id', leaveDelete)
router.get('/get', getLeave)

module.exports = router