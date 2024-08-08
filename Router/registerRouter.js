const express = require('express');
const { register, login } = require('../Controller/registerController');
const router = express.Router();

router.post('/register', register)
router.post('/login', login)

module.exports = router