const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const urlSchem = new mongoose.Schema({
  username: { type: String, required: true },
  origin: { type: String, required: true },
  shorterUrl: { type: String, required: true, unique: true },
  redirectCount: { type: Number, required: true },
  redirectEntriesLog: [{ type: Date }],
  creationDate: { type: Date, required: true },
});

urlSchem.plugin(uniqueValidator);
const Url = mongoose.model("url", urlSchem);

module.exports = Url;
