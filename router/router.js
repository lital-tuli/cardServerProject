const express = require("express");
const router = express.Router();
const cardsRouterController = require("../cards/routes/cardRestControllers");
const userRouterController = require("../users/routes/userRestControllers");

router.use("/cards", cardsRouterController);
router.use("/users", userRouterController);
router.use((req, res) => {
  res.status(404).send("Path not found");
});

module.exports = router;
