const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  // get the token from the header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  jwt.verify(token, "princekey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded.id;
    next();
  });
};

module.exports = isAuthenticated;
