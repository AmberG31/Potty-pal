const jwt = require("jsonwebtoken");

module.exports = (userId) =>
  jwt.sign(
    {
      userId,
      // Set the issued at time to the current time
      // iat = issued at
      iat: Math.floor(Date.now() / 1000),

      //! TODO: Set the JWT token to expire in 10 minutes in production

      // Set the JWT token to expire in 60 minutes
      // exp = expires
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    // Wrap in a template literal to ensure the value is read as a string
    `${process.env.JWT_SECRET}`
  );
