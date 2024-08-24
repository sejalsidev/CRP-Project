const Joi = require('joi')
const attendanceValidation = {
    body: Joi.object({
        employee: Joi.string().required(),
        date: Joi.string().required(),
        clockIn: Joi.string().required(),
        clockOut: Joi.string().required(),
        status: Joi.string().required(),
        notes: Joi.string().required()
    })
}
module.exports = { attendanceValidation }