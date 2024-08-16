const express = require('express')
const { addActivitysection, updateActivitySection, deleteActivitysection, getActivitysection } = require('../Controller/ActivitysectionController')
const router = express.Router()
const auth = require('../Middleware/middleware')

router.post('/add', auth, addActivitysection)
router.put('/update/:id', auth, updateActivitySection)
router.delete('/delete/:id', auth, deleteActivitysection)
router.get('/getactivity', auth, getActivitysection)

module.exports = router