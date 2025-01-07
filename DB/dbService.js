const connectToAtlasDb = require("./mongodb/connectToAtlas");
const connectToLocalDb = require("./mongodb/connectToMongoLocally");

const ENVIRONMENT = "development"; // development == test, production == live

const connectToDB = async () => {
  if (ENVIRONMENT === "development") {
    await connectToLocalDb();
  }
  if (ENVIRONMENT === "production") {
    await connectToAtlasDb();
  }
};

module.exports = connectToDB;
