const Joi = require("joi");

const joiValidateCard = (card) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(2)
      .max(256)
      .required()
      .messages({
        'string.min': 'Title must be at least 2 characters',
        'string.max': 'Title cannot exceed 256 characters',
        'any.required': 'Title is required'
      }),
    subtitle: Joi.string()
      .min(2)
      .max(256)
      .required()
      .messages({
        'string.min': 'Subtitle must be at least 2 characters',
        'string.max': 'Subtitle cannot exceed 256 characters',
        'any.required': 'Subtitle is required'
      }),
    description: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .messages({
        'string.min': 'Description must be at least 2 characters',
        'string.max': 'Description cannot exceed 1024 characters',
        'any.required': 'Description is required'
      }),
    phone: Joi.string()
      .regex(/^0[0-9]{1,2}-?[0-9]{7,8}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone must be a valid Israeli phone number',
        'any.required': 'Phone is required'
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Email must be valid',
        'any.required': 'Email is required'
      }),
    web: Joi.string()
      .uri()
      .allow('')
      .messages({
        'string.uri': 'Web must be a valid URL'
      }),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .uri()
          .allow('')
          .messages({
            'string.uri': 'Image URL must be a valid URL'
          }),
        alt: Joi.string().min(2).max(256).allow(''),
      })
      .required(),
    address: Joi.object()
      .keys({
        state: Joi.string().allow(''),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().integer().min(1).required(),
        zip: Joi.number().integer().min(0).allow(null),
      })
      .required(),
    bizNumber: Joi.number()
      .integer()
      .min(1000000)
      .max(9999999)
      .allow(null),
    user_id: Joi.string().allow(null),
    likes: Joi.array().items(Joi.string()).default([])
  });

  return schema.validate(card);
};

module.exports = joiValidateCard;