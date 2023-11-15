require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./authRoutes");
const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", publicRoutes);
app.use("/private", privateRoutes);

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster.bduwuwe.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Connected");
  })
  .catch((error) => console.log("Erro: " + error));
