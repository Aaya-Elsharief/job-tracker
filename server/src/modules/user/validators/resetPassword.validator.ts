import Joi from "joi";

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
}).options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});