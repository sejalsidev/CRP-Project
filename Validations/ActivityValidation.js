const Joi = require('joi')

const activitySection = {
    body: Joi.object({
        activityType: Joi.string().required(),
        activityDesc: Joi.string().required(),
        activityDate: Joi.string().required(),
        title: Joi.string().required()
    })
}
module.exports = { activitySection }