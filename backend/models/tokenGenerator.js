const jwt = require("jsonwebtoken");

module.exports = (userId) =>
  jwt.sign(
    {
      userId,
      iat: Math.floor(Date.now() / 1000),

      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    // Wrap in a template literal to ensure the value is read as a string
    `${process.env.JWT_SECRET}`
  );
