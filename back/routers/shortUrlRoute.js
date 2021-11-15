const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const Url = require("../schems/urls");

/**
 * *This route routes to:
 * ? /api/shorturl/
 */

/**
 * * Sends back shorter URL Custom (shorturl_Name)
 */
router.post("/custom", async (req, res, next) => {
  try {
    if (req.body.url && req.body.custom) {
      await Url.create({
        username: req.body.username,
        origin: req.body.url,
        shorterUrl: req.body.custom,
        redirectCount: 0,
        redirectEntriesLog: [],
        creationDate: new Date(),
      });
      res.json({ message: "Added successfully", shorturl: req.body.custom });
    } else {
      next({ status: 405, message: "Missing 'url' or 'custom' in body" });
    }
  } catch (error) {
    next({ status: 404, message: error.message });
  }
});

/**
 *  * Returns url short info
 */
router.get("/info/:urlid", async (req, res, next) => {
  try {
    let urlInfo = await Url.find({ shorterUrl: req.params.urlid });
    res.json(urlInfo);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
});

/**
 * * Redirect base on short url ID
 */
router.get("/:urlid", async (req, res, next) => {
  try {
    let shorturlObj = await Url.findOne({ shorterUrl: req.params.urlid });
    res.redirect(shorturlObj.origin);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
});

/**
 * * Sends back shorter URL (shorturl_ID)
 */
router.post("/", async (req, res, next) => {
  try {
    if (req.body.url) {
      let id = uniqid();
      await Url.create({
        username: req.body.username,
        origin: req.body.url,
        shorterUrl: id,
        redirectCount: 0,
        redirectEntriesLog: [],
        creationDate: new Date(),
      });
      res.json({ message: "Added successfully", shorturl: id });
    } else {
      next({ status: 405, message: "Missing 'url' in body" });
    }
  } catch (error) {
    next({ status: 404, message: error.message });
  }
});

module.exports = router;
