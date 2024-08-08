const Joi = require('joi')

const taskRequestValidate = {
    body: Joi.object({
        employee: Joi.string().required(),
        task: Joi.string().required(),
        description: Joi.string().required()

    })
}
module.exports = { taskRequestValidate }