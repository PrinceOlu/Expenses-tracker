const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  // Get the token from the header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  // If token is not provided, return an error response
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  // Verify the token
  jwt.verify(token, "princekey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // If token is valid, attach the decoded user to the request object
    req.user = decoded.id; // Assuming the decoded token has an 'id' property
    next();
  });
};

module.exports = isAuthenticated;
