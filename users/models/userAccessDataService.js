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

const getUser = async (UserId) => {
  try {
    let user = await User.findById(UserId);
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const userFromDB = await User.findOne({ email });
    if (!userFromDB) {
const error = new Error("user not exist , please register");
error.status = 401; 
createError("Authentication", error);

    }
    
    if (!comparePasswords(password, userFromDB.password)) {
      const error = new Error(" password is not correct");
      error.status = 401;
      throw error;
    }
    
    const token = generateAuthToken(userFromDB);
    return token;
    
  } catch (error) {
    createError("Authentication", error);
    throw error;
  }
};

module.exports = { registerUser, getUser, loginUser };