import Joi from "joi";

export const userValidationSchema = Joi.object({ 
    firstName: Joi.string().required(), 
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(), 
}).options({
    abortEarly: false, 
    allowUnknown: true, 
    stripUnknown: true 
});