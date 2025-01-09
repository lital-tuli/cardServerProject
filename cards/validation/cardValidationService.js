const joiValidateCard = require("./joi/joiValidationCard");

  
const validator = "Joi";

const validateCard = (card) => {
  if (validator === "Joi") {
    const { error } = joiValidateCard(card);
    if (error) return error.details[0].message;
    return "";
  }
};

module.exports = validateCard;