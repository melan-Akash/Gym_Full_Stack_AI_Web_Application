const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect routes: Verify JWT bearer token in Authorization header
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from Bearer header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "forged_gym_secret_jwt_key_2026_super_secure_hypertrophy");

      // Attach user object (excluding password) to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Auth error:", error.message);
      return res.status(401).json({ success: false, message: "Not authorized, token failed or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token provided" });
  }
};

/**
 * Role-based authorization middleware
 * @param  {...string} roles - Allowed roles e.g. 'admin', 'trainer'
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : "none"}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
