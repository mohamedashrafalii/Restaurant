const Joi = require('joi')
const addTargetValidation = (data) =>{
    const schema = 
    {
        name:Joi.string().min(1).max(50).required(),
        nationalNumber:Joi.number().integer().allow(null).allow(''),
        militaryNumber:Joi.number().integer().allow(null).allow(''),
        type:Joi.string().min(1).max(50).required(),
        subPatient:Joi.string().max(50).allow(null).allow(''),
        subPatientName:Joi.string().max(50).allow(null).allow(''),
        rate:Joi.number().positive().allow(null).allow(''),
        ticketPrice:Joi.number().positive().required().allow(null).allow(''),
        neededNumber:Joi.number().integer().required(),
        typeOfType:Joi.string().min(1).max(50).allow(null).allow(''),
        username:Joi.string().min(1).max(50).allow(null).allow(''),
        phoneNumber:Joi.number().integer().positive().required(),
    }
    return Joi.validate(data,schema)
}

const updateTargetValidation = (data) =>{
    const schema = 
    {
        name:Joi.string().max(50).allow(null).allow(''),
        nationalNumber:Joi.number().integer().allow(null).allow(''),
        militaryNumber:Joi.number().integer().allow(null).allow(''),
        type:Joi.string().max(50).allow(null).allow(''),
        subPatient:Joi.string().max(50).allow(null).allow(''),
        subPatientName:Joi.string().max(50).allow(null).allow(''),
        neededNumber:Joi.number().integer().allow(null).allow(''),
        typeOfType:Joi.string().max(50).allow(null).allow(''),
        username:Joi.string().max(50).allow(null).allow(''),
        phoneNumber:Joi.number().integer().positive().allow(null).allow('')
    }
    return Joi.validate(data,schema)
}
module.exports = {addTargetValidation,updateTargetValidation}