const express = require('express')
const { addRequestsection, updateRequestsection, deleteRequestsection, getRequestsection } = require('../Controller/RequestsectionController')
const router = express.Router()
const auth = require('../Middleware/middleware')

router.post('/add', addRequestsection)
router.put('/update/:id', updateRequestsection)
router.delete('/delete/:id', deleteRequestsection)
router.get('/get', auth, getRequestsection)

module.exports = router