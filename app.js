const mongoose = require("mongoose");
const express = require("express");

const connectToDB = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const app = express();
const PORT = 8181;
app.use(corsMiddleware)
app.use(express.json());


app.use((req, res ,next) => {
  console.log(
    `New request from URL: ${req.url}, Method: ${
      req.method
    }, Time: ${new Date()}`
  );
  next();

});
app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send("Internal Server error.");
});

app.listen(PORT, () => {
  console.log("Server lisening to port " + PORT);
  connectToDB();
});
