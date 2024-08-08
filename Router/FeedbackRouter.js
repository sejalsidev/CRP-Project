const express = require('express')
const { addFeedback, getFeedback, updateFeedback, deleteFeedback } = require('../Controller/FeedbackController')
const router = express.Router()

router.post('/addFeedback', addFeedback)
router.get('/getfeedback', getFeedback)
router.put('/updatefeedback/:id', updateFeedback)
router.delete('/deletefeedback/:id', deleteFeedback)

module.exports = router