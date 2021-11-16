const express = require("express");
const router = express.Router();

/**
 * *This route routes to:
 * ? /logout
 */

router.delete("/", (req, res, next) => {
  res.clearCookie("token");
  res.send("loged out");
});

module.exports = router;
