const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_WORD = process.env.SECRET;

const generateAuthToken = (user) => {
  const payload = {
    _id: user._id,
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
  };
  const token = jwt.sign(payload, SECRET_WORD ,{ expiresIn: '24h' });
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const payload = jwt.verify(tokenFromClient, SECRET_WORD);
    return payload;
  } catch (error) {
    return null;
  }
};

module.exports = { generateAuthToken, verifyToken };