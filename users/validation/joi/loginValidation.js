const Joi = require("joi");

const loginValidation = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": 'Email must be a valid email address',
        "any.required": 'Email is required'
      }),

    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.min": 'Password must be at least 6 characters long',
        "any.required": 'Password is required'
      })
  });
  return schema.validate(user);
};

module.exports = loginValidation;