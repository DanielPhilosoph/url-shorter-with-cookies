require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const shortUrlRouter = require("./routers/shortUrlRoute");
const registerRouter = require("./routers/registerRoute");
const usernameRouter = require("./routers/usernameRoute");
const logoutRouter = require("./routers/logoutRoute");
const authenticateToken = require("./middleware/authenticateToken");
const loginRouter = require("./routers/loginRoute");
//const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// * MongoDB connection
const url = `mongodb+srv://daniel_mongo_user:${process.env.PASSWORD}@cluster0.xx3io.mongodb.net/urlShorter?retryWrites=true&w=majority`;

mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.static(path.resolve("./front"))); // serve main path as static dir

app.get("/", function (req, res) {
  // serve main path as static file
  res.sendFile(path.resolve("./front/index.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.resolve("./front/register.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.resolve("./front/urlshoter.html"));
});

app.use("/username", authenticateToken, usernameRouter);
app.use("/api/shorturl/", authenticateToken, shortUrlRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
module.exports = app;
