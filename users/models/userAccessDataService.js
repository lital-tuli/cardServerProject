const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generatePassword, comparePasswords } = require("../helpers/bcrypt");
const User = require("./mongodb/User");

const registerUser = async (newUser) => {
  try {
    newUser.password = generatePassword(newUser.password);
    let user = new User(newUser);
    user = await user.save();
    user = { email: user.email, name: user.name, _id: user._id };
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getUser = async (userId) => {
  try {
    let user = await User.findById(userId).select(["-password", "-__v"]);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const isPasswordValid = comparePasswords(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const token = generateAuthToken(user);
    return token;
  } catch (error) {
    error.status = error.status || 401;
    return createError("Authentication", error);
  }
};

module.exports = { registerUser, getUser, loginUser };