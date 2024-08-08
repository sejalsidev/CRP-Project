const Joi = require('joi')

const validateWorkHistory = {
    body: Joi.object({
        employee: Joi.string().required(),
        companyName: Joi.string().required(),
        jobTitle: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        status: Joi.string().required(),
        assignTask: Joi.string().required()
    })
}
module.exports = { validateWorkHistory }
