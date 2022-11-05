const Joi = require('joi')
const addTargetValidation = (data) =>{
    const schema = 
    {
   patientNumber:Joi.number().integer().positive().required(),
   patientName:Joi.string().min(1).max(50).required(),
   needed:Joi.number().integer().positive().required(),
   paid:Joi.number().integer().positive().required(),
   remainder:Joi.number().integer().positive().required(),
   ticketPrice:Joi.number().positive().required(),
   rate:Joi.number().positive().required(),
   total:Joi.number().positive().required(),
   username:Joi.string().min(1).max(50).required(),
   time:Joi.required(),
  
    }
    return Joi.validate(data,schema)
}

const updateTargetValidation = (data) =>{
    const schema = 
    {
   patientNumber:Joi.number().positive().integer().allow(null).allow(''),
   patientName:Joi.string().positive().max(50).allow(null).allow(''),
   needed:Joi.number().positive().integer().allow(null).allow(''),
   paid:Joi.number().positive().integer().allow(null).allow(''),
   remainder:Joi.number().positive().integer().allow(null).allow(''),
   ticketPrice:Joi.number().positive().allow(null).allow(''),
   rate:Joi.number().positive().allow(null).allow(''),
   total:Joi.number().positive().allow(null).allow(''),
   username:Joi.string().max(50).allow(null).allow(''),
   time:joi.string().allow(null).allow('')
  
    }
    return Joi.validate(data,schema)
}
module.exports = {addTargetValidation,updateTargetValidation}