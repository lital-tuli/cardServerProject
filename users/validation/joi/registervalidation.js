const Joi = require("joi");

const registerValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object()
      .keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256).allow(""),
        last: Joi.string().min(2).max(256).required(),
      })
      .required(),
    phone: Joi.string()
      .regex(/^0[0-9]{1,2}-?[0-9]{7,8}$/)
      .message('User phone number must be a valid Israeli phone number')
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Email must be valid',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(8)
      .max(20)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{8,}$/)
      .message('Password must be 8-20 characters and contain: uppercase letter, lowercase letter, number, and special character (!@#$%^&*-)')
      .required(),
    image: Joi.object()
      .keys({
        url: Joi.string().uri().allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),
    address: Joi.object()
      .keys({
        state: Joi.string().allow(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().integer().min(1).required(),
        zip: Joi.number().integer().min(0).allow(null),
      })
      .required(),
    isBusiness: Joi.boolean().required(),
    isAdmin: Joi.boolean().allow(""),
  });
  return schema.validate(user);
};

module.exports = registerValidation;