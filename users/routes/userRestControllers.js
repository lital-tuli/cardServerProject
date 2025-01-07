const express = require("express");
const { registerUser, getUser } = require("../models/userAccessDataService");
const auth = require("../../auth/authService");
const router = express.Router();


// Public route - Register new user
router.post("/", auth, async (req, res) => {
  try {
    let user = await registerUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let { id } = req.params;
    let user = await getUser(id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/login", async (req, res) => {
  try{
  let{ email , password} = req.body;
  const token = await loginUser(email, password);
  res.send(token);
  }
  catch(error){
    res.status(400).send(error.message);
  }
}
);
module.exports = router;