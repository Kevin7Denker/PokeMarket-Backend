const express = require("express");
const route = express.Router();

// -------------------- Welcome -------------------- //

route.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Denker's Api" });
});

module.exports = route;