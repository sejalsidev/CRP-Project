const express = require('express')
const { addWorkhistory, getWorkHistory, updateworkHistory, deleteworkhistory } = require('../Controller/workhistoryController')
const auth = require('../Middleware/middleware')
const router = express.Router()

router.post('/add', auth, addWorkhistory)
router.get('/get/:employeeId', auth, getWorkHistory)
router.put('/update/:id', updateworkHistory)
router.delete('/delete/:id', deleteworkhistory)

module.exports = router