const express = require("express");
const router = express.Router();

/**
 * *This route routes to:
 * ? /username
 */

router.get("/", (req, res, next) => {
  try {
    res.json({ username: req.user.user });
  } catch (error) {
    next({ status: 404, message: "Could not find username - check cookies" });
  }
});

module.exports = router;
