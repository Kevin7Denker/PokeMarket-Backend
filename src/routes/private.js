const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const checkToken = require("../repository/auth_repository");
const route = express.Router();

route.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  try {

  } catch (error) {
    res.status(401).json({ msg: "Access Denied" });
  }
});

module.exports = route;
