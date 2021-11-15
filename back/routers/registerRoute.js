require("dotenv").config();
const express = require("express");
const router = express.Router();
const Users = require("../schems/users");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_ENCRIPT_KEY);

/**
 * *This route routes to:
 * ? /register
 */

router.post("/", async (req, res, next) => {
  try {
    if (req.body.username && req.body.password && req.body.email) {
      await Users.create({
        username: req.body.username,
        password: cryptr.encrypt(req.body.password),
        email: req.body.email,
        userCreationDate: new Date(),
      });
      res.json({ message: "Added successfully" });
    } else {
      next({
        status: 405,
        message: "Missing 'username' or 'password' or 'email' in body",
      });
    }
  } catch (error) {
    next({ status: 404, message: error.message });
  }
});

module.exports = router;
