const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
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

  if (!confirmPassword) {
    return res
      .status(422)
      .json({ msg: "The confirmed password field is required" });
  }

  if (password !== confirmPassword) {
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
};

module.exports = {
    registerUser
}
