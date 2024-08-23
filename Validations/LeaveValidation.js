const Joi = require('joi')

const leave = {
    body: Joi.object({
        employee: Joi.string().required(),
        leaveType: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        reason: Joi.string().required(),
        status: Joi.string().required()
    })
}
module.exports = { leave }