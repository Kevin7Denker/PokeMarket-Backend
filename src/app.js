require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const app = express();
app.use(express.json());

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Denker's Api" });
});

//Private Route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id, "-password");

  if (!user) {
    return req.status(404).json({ msg: "User not found" });
  }

  try {
  } catch (error) {}
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token invalid" });
  }
}

// Sing Up Route
app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  const userExists = await User.findOne({ email: email });

  if (!name) {
    return res.status(422).json({ msg: "The name field is required" });
  }
  if (!email) {
    return res.status(422).json({ msg: "The email field is required" });
  }
  if (!password) {
    return res.status(422).json({ msg: "The password field is required" });
  }
  if (!confirmpassword) {
    return res
      .status(422)
      .json({ msg: "The confirmed password field is required" });
  }
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "The passowords need to be similar" });
  }
  if (userExists) {
    return res.status(422).json({ msg: "Email is already registered" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: passwordHash });

  try {
    await user.save();

    res.status(200).json({ msg: "Completed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error at server " });
  }
});

// Sing In Route
app.post("/auth/login", async (req, res) => {
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

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster.bduwuwe.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Connected");
  })
  .catch((error) => console.log("Erro: " + error));
