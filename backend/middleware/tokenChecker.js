const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('no token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add userId to request
    req.userId = decoded.userId;

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('Invalid user');
    }

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
