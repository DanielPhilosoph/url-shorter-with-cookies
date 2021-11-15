const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchem = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true },
  userCreationDate: { type: Date, required: true },
});

userSchem.plugin(uniqueValidator);
const Users = mongoose.model("user", userSchem);

module.exports = Users;
