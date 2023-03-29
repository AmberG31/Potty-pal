const jwt = require("jsonwebtoken");

module.exports = (userId) =>
  jwt.sign(
    {
      userId,
      // Set the JWT token to be issued 5 minutes ago
      // iat = issued at
      iat: Math.floor(Date.now() / 1000),

      // Set the JWT token to expire in 20 minutes
      // exp = expires
      exp: Math.floor(Date.now() / 1000) + 20 * 60,
    },
    // Wrap in a template literal to ensure the value is read as a string
    `${process.env.JWT_SECRET}`
  );
