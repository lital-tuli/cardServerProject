const { generateAuthToken } = require("../../auth/providers/jwt");
const User = require("./mongodb/User");

const registerUser = async (newUser) => {
  try {
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    throw new Error("Mongoose " + error.message);
  }
};

const getUser = async (UserId) => {
  try {
    let user = await User.findById(UserId);
    return user;
  } catch (error) {
    throw new Error("Mongoose:" + error);
  }
};

const loginUser = async (email, password) => {
  try {
    const userFromBD = await User.findOne({ email });
    if (!userFromBD) {
      throw new Error("Authentication Error: User not exsist. Please register");
    }
    if (userFromBD.password !== password) {
      throw new Error("Authentication Error: Password Missmatch");
    }
    const token = generateAuthToken(userFromBD);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { registerUser, getUser, loginUser };