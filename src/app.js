require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const publicRoutes = require("./routes/public");
const privateRoutes = require("./routes/private");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(express.json());

app.options("*", cors());

app.use("/auth", authRoutes);
app.use("/", publicRoutes);
app.use("/private", privateRoutes);

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster.irye11p.mongodb.net/${dbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
    console.log("Connected");
  })
  .catch((error) => console.log("Erro: " + error));
