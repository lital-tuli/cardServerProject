const express = require("express");
const {
  createCard,
  getCards,
  getCard,
  getMyCards,
  updateCard,
  likeCard,
  deleteCard,
} = require("../models/cardAccessDataService");
const auth = require("../../auth/authService");
const validateBusinessUser = require("../../auth/businessAuth");
const { createError, handleError } = require("../../utils/handleErrors");
const { normalizeCard } = require("../helpers/nornalize");
const validateCard = require("../validation/cardValidationService");
const router = express.Router();

router.post("/", auth, validateBusinessUser, async (req, res) => {
  try {
    const validateErrorMessage = validateCard(req.body);
    if (validateErrorMessage !== "") {
      const error = new Error("Validation Error: " + validateErrorMessage);
      error.status = 400;
      throw createError("Validation", error);
    }
    
    let card = await normalizeCard(req.body, req.user._id);
    card = await createCard(card);
    res.status(201).send(card);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    res.send(cards);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", auth, validateBusinessUser, async (req, res) => {
  try {
    const cards = await getMyCards(req.user._id);
    res.send(cards);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    if (!card) {
      const error = new Error("Card not found");
      error.status = 404;
      throw createError("DataNotFound", error);
    }
    res.send(card);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const originalCard = await getCard(id);

    if (!originalCard) {
      const error = new Error("Card not found");
      error.status = 404;
      throw createError("DataNotFound", error);
    }

    if (req.user._id != originalCard.user_id && !req.user.isAdmin) {
      const error = new Error("Authorization Error: Only the user who created the card or admin can edit");
      error.status = 403;
      throw createError("Authorization", error);
    }

    const validateErrorMessage = validateCard(req.body);
    if (validateErrorMessage !== "") {
      const error = new Error("Validation Error: " + validateErrorMessage);
      error.status = 400;
      throw createError("Validation", error);
    }

    let card = await normalizeCard(req.body, req.user._id);
    card = await updateCard(id, card);
    res.send(card);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const card = await likeCard(id, userId);
    res.send(card);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const originalCard = await getCard(id);
    
    if (!originalCard) {
      const error = new Error("Card not found");
      error.status = 404;
      throw createError("DataNotFound", error);
    }

    if (req.user._id != originalCard.user_id && !req.user.isAdmin) {
      const error = new Error("Authorization Error: Only the user who created the card or admin can delete");
      error.status = 403;
      throw createError("Authorization", error);
    }

    const card = await deleteCard(id);
    res.send(card);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;