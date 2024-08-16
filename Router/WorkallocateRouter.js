const express = require('express')
const { addWorkAllocate, getWorkAllocate, deleteworkAllocate, updateWorkAllocate, getEmployeeName, getWorkHistory } = require('../Controller/workAllocateController')
const auth = require('../Middleware/middleware')
const { validate } = require('express-validation')
const { validateWorkAllocate } = require('../Validations/workallocateValidation')
const router = express.Router()


router.post('/add', auth, validate(validateWorkAllocate), addWorkAllocate)
router.get('/get', auth, getWorkAllocate)
router.put('/update/:id', auth, updateWorkAllocate)
router.delete('/delete/:id', auth, deleteworkAllocate)
router.get('/getEmployeeName', auth, getEmployeeName)
router.get('/getworkhistory', auth, getWorkHistory)

module.exports = router