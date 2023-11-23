const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();

const User = require("../models/User");
const authController = require('../controllers/auth_controllers');
  

route.post("/register", authController.registerUser);

// -------------------- Sing In -------------------- //

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!email) {
    return res.status(422).json({ msg: "The email field is required" });
  }
  if (!password) {
    return res.status(422).json({ msg: "The password field is required" });
  }
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const check = await bcrypt.compare(password, user.password);

  if (!check) {
    return res.status(422).json({ msg: "Invalid Password" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign({ id: user._id }, secret);

    res.status(200).json({ msg: "Sucess" });
  } catch (error) {}
}); 

module.exports = route;