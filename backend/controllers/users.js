const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../models/tokenGenerator");

const createUser = async (req, res) => {
  try {
    // Destructure the request body
    let { username, email, password } = req.body;
    // hash the password
    hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error("Email or username already exists");
    }

    let user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    user = user.toObject();

    // Remove the password from the user object
    delete user.password;
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error_message: err.message });
  }
};

// Returns the details for the logged in user
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne(
      { _id: req.userId },
      // Remove the password and __v from the user object so it's not sent to the client
      { password: 0, __v: 0 }
    );
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error_message: err.message });
  }
};

module.exports = { createUser, getUser };
