const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  password: String,
  lastLogin: {type: Date, default: Date.now()},
  lastUpdate: {type: Date, default: Date.now()},
  dateCriation: {type: Date, default: Date.now()},
});

module.exports = mongoose.model("User", User);
