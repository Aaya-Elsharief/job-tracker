import Joi from 'joi';

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
