import Joi from "joi";

export const emailValidationSchema = Joi.object({
  email: Joi.string().email().required(),
}).options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});
