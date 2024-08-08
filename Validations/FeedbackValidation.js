const Joi = require('joi')

const feedbackData = {
    body: Joi.object({
        // userEmail: Joi.string().required(),
        user: Joi.string().required(),
        comments: Joi.string().required(),
        rating: Joi.string().required(),
        dateSubmitted: Joi.string()
    })
}
module.exports = { feedbackData }