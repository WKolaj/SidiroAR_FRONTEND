import Joi from "@hapi/joi";

//Schema for validating user auth
export const authSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).max(255).required(),
});

//Schema for validating current user
export const passwordSchema = Joi.object({
  newPassword: Joi.string().min(8).max(255).required(),
  oldPassword: Joi.string().min(8).max(255).required(),
});

//Schema for validating user
export const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  defaultLang: Joi.string().valid("pl", "en").required(),
  permissions: Joi.number().integer().min(0).max(255).required(),
  password: Joi.string().min(8).max(255),
});

//Schema for validating model
export const createModelSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  file: Joi.optional(),
  iosFile: Joi.optional(),
});

//Schema for cloning model
export const cloneModelSchema = Joi.object({
  userToClone: Joi.string().required(),
  modelToClone: Joi.string().required(),
});

//Schema for validating model
export const editModelSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
});
