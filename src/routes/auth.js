const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();

const User = require("../models/User");
const authController = require('../controllers/auth_controllers');
  
route.post("/login", authController.loginUser); 
route.post("/register", authController.registerUser);

module.exports = route;