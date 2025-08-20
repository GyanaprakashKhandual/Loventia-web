const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1] || req.cookies?.token || req.query?.token;

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error in authentication." });
  }
};

module.exports = authMiddleware;
