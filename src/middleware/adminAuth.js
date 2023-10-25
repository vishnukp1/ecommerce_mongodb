const jwt = require("jsonwebtoken");

const adminVerify = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (authHeader === undefined) {
    res.status(401).json({ error: "token is not provided for user" });
  }
  let token = authHeader.split(" ").pop();

  jwt.verify(token, "admin", (err, decoded) => {
    if (err) {
      res.status(500).json({ error: "authentication failed" });
    } else {
  
      next();
    }
  });
};

module.exports = adminVerify;
