require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../schems/users");

/**
 * *This route routes to:
 * ? /login
 */

router.post("/", async (req, res, next) => {
  try {
    let user = await Users.find({
      username: req.body.username,
      password: req.body.password,
    });
    if (user.length === 1) {
      const accessToken = generateAccessToken({ user: req.body.username });
      res.json({ message: "Success" });
    } else {
      next({ status: 406, message: "failed" });
    }
  } catch (error) {
    next({ status: 404, message: error.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return next({ status: 401, message: "no authorization header" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(err);
    if (err) return next({ status: 403, message: "wrong authorization" });
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "600s" });
}

module.exports = router;
