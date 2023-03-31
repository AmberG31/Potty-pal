const bcrypt = require('bcryptjs');
const User = require('../models/user');
const tokenGenerator = require('../models/tokenGenerator');

// allow user to login with email or password
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] }).lean();

    if (!user) {
      throw new Error('No account with this username or email');
    }

    const passwordIsMatch = bcrypt.compareSync(password, user.password);

    if (!passwordIsMatch) {
      throw new Error('Incorrect password');
    }

    delete user.password;
    delete user.__v;

    const token = tokenGenerator(user._id);

    res.status(200).json({ token, user, message: 'Login Successful' });
  } catch (error) {
    // console.log("401 Error message: ", error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = { login };
