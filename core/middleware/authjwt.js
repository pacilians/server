const jwt = require("jsonwebtoken");
const SECRET_KEY = "BNI CUSTODY SYSTEM";

function verifyToken(req, res, next) {
  const token = req.headers["token"];
  if (!token) {
    return res.status(403).json({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
