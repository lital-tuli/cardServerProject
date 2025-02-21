const express = require("express");
const { registerUser, getUser, loginUser } = require("../models/userAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const { validateLogin, validateRegistration } = require("../validation/userValidationService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const validateErrorMessage = validateRegistration(req.body);
    if (validateErrorMessage !== "") {
      return handleError(res, 400, validateErrorMessage);
    }
    
    const user = await registerUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const validateErrorMessage = validateLogin(req.body);
    if (validateErrorMessage !== "") {
      return handleError(res, 400, validateErrorMessage);
    }

    const { email, password } = req.body;
    const token = await loginUser(email, password);
    
    if (token.error) {
      return handleError(res, token.status || 401, token.message);
    }

    return res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;

    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(res, 403, "Authorization Error: Access denied");
    }

    const user = await getUser(id);
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;