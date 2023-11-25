const express = require("express");
const route = express.Router();



route.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Denker's Api" });
});




module.exports = route;