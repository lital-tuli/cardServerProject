const { createError } = require("../utils/handleErrors");

const validateBusinessUser = (req, res, next) => {
  try {
    if (!req.user.isBusiness) {
      const error = new Error("Authorization Error: Only business users can create cards");
      error.status = 403;
      return createError("Authorization", error);
    }
    next();
  } catch (error) {
    return createError("Authorization", error);
  }
};

module.exports = validateBusinessUser;