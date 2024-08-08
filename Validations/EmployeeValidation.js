const Joi = require("joi");

const employeeData = {
    body: Joi.object({
        firstName: Joi.string().required(),
        middleName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateofbirth: Joi.string().required(),
        fatherName: Joi.string().required(),
        gender: Joi.string().required(),
        materialStatus: Joi.string().required(),
        identityMark: Joi.string().required(),
        image: Joi.string().optional(null),
        caste: Joi.string().required(),
        bloodGroup: Joi.string().required(),
        height: Joi.string().required(),
        medicalFitness: Joi.string().required(),
        certificate: Joi.string().required(),
        religion: Joi.string().required(),
        homeState: Joi.string().required(),
        homeTown: Joi.string().required(),
        category: Joi.string().required(),
        homeDistict: Joi.string().required(),
        nearRailway: Joi.string().required(),
        remarks: Joi.string().required(),
        officeDesignation: Joi.string().required(),
        OfficeCadre: Joi.string().required(),
        currentOffice: Joi.string().required(),
        officeType: Joi.string().required()
    })
}

module.exports = { employeeData }