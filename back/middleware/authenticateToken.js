const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  jwt.verify(
    req.cookies.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return next({ status: 403, message: "wrong authorization" });
      req.user = user;
      next();
    }
  );
}

module.exports = authenticateToken;
