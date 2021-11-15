require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../schems/users");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_ENCRIPT_KEY);

/**
 * *This route routes to:
 * ? /login
 */

router.post("/", async (req, res, next) => {
  try {
    let user = await Users.findOne({
      username: req.body.username,
    });
    if (user && cryptr.decrypt(user.password) === req.body.password) {
      const accessToken = generateAccessToken({ user: req.body.username });

      res.cookie("token", accessToken);
      res.json({ message: "Success" });
    } else {
      next({ status: 406, message: "Username or password are incorrect" });
    }
  } catch (error) {
    next({ status: 404, message: error.message });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "600s" });
}

module.exports = router;
