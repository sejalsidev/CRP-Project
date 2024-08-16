const Joi = require('joi')

const requestSection = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        priority: Joi.string().required(),
        status: Joi.string().required(),
        dateCreated: Joi.string().required(),
        dateUpdated: Joi.string().required()
    })
}
module.exports = { requestSection }