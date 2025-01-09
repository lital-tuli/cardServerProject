const Joi = require('joi');
const urlRegex = 
/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;



const schema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(256)
        .required(),
        subtitle: Joi.string()
        .min(2)
        .max(256)
        .required(),

    description: Joi.string()
    .min(2)
    .max(1024)
    .required(),

    phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).rule({message:"card phone number is not valid"}).required(),

email: Joi.string().ruleset.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
.rule({message:"card email is not valid"}).required(),

    web: Joi.string().ruleset.regex(urlRegex)
    .rule({message:"card web is not valid"})
    .allow(""),
    image: Joi.object().keys({
        url: Joi.string().ruleset.regex(urlRegex)
        .rule({message:"card image url is not valid"})
        .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
    })
    .required(),

    address: Joi.object().keys({
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().allow(""),
        zip: Joi.number(),
        housenumber: Joi.string().required(),
    }),
}).required();

module.exports = schema;


