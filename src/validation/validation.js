import Joi from "joi-browser";

//Schema for validating user auth
export const authSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^\d+$/)
    .min(4)
    .max(4)
    .required()
});

//Schema for validating current user
export const passwordSchema = Joi.object().keys({
  newPassword: Joi.string()
    .regex(/^\d+$/)
    .min(4)
    .max(4)
    .required(),
  oldPassword: Joi.string()
    .regex(/^\d+$/)
    .min(4)
    .max(4)
    .required()
});
