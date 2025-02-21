const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const chalk = require("chalk");
const {loggerMiddleware} = require("./logger/loggerService");
const seedDB = require("./utils/seedDB"); 

const app = express();
const PORT = process.env.PORT || 8181;
require("dotenv").config();
app.use(express.static("./public"));
app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware());

app.use(router);

app.use((err, req, res, next) => {
  const message = err || "Internal Server error.";
  return handleError(res, 500, message);
});

app.listen(PORT, async () => {  // Make this async
  console.log(chalk.bgGreenBright.white("Server listening to port " + PORT));
  try {
    await connectToDB();  // Wait for DB connection
    await seedDB();      // Seed the database after connection
    console.log(chalk.bgBlueBright.white("Database connection and seeding completed"));
  } catch (error) {
    console.log(chalk.bgRedBright.white("Error connecting to database:", error.message));
  }
});