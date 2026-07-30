const jwt = require("jsonwebtoken");

/**
 * Generate signed JWT token for user authentication
 * @param {string} id - User MongoDB ObjectId
 */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "forged_gym_secret_jwt_key_2026_super_secure_hypertrophy",
    {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    }
  );
};

module.exports = generateToken;
