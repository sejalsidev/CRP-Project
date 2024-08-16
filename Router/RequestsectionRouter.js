const express = require('express')
const { addRequestsection, updateRequestsection, deleteRequestsection } = require('../Controller/RequestsectionController')
const router = express.Router()
const auth = require('../Middleware/middleware')

router.post('/add', addRequestsection)
router.put('/update/:id', updateRequestsection)
router.delete('/delete/:id', deleteRequestsection)

module.exports = router