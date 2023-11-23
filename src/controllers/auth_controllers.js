const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
    res.status(200).json({
      success: true,
      msg: "Register successfully",
      data: [
        {
          id: user._id,
          name: user.name,
          email: user.email,
          lastLogin: user.lastLogin,
          dateCriation: user.dateCriation,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error at server " });
  }
};

const loginUser = async (req, res) => {
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

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30m" });

    user.lastLogin = Date.now();

    await user.save();

    res.status(200).json({
      success: true,
      msg: "Login successfully",
      token: token,
      data: [
        {
          id: user._id,
          name: user.name,
          email: user.email,
          lastLogin: user.lastLogin,
          dateCriation: user.dateCriation,
        },
      ],
    });
  } catch (error) {}
};

module.exports = {
  registerUser,
  loginUser,
};
