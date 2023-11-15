require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const publicRoutes = require("./routes/public");
const privateRoutes = require("./routes/private");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const app = express();
app.use(cors());

app.use(express.json());

app.options("*", cors());

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
