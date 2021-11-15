require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const shortUrlRouter = require("./routers/shortUrlRoute");
const registerRouter = require("./routers/registerRoute");
const loginRouter = require("./routers/loginRoute");
//const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// * MongoDB connection
const url = `mongodb+srv://daniel_mongo_user:${process.env.PASSWORD}@cluster0.xx3io.mongodb.net/urlShorter?retryWrites=true&w=majority`;

mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use("/", express.static(path.resolve("./front"))); // serve main path as static dir
app.get("/", function (req, res) {
  // serve main path as static file
  res.sendFile(path.resolve("./front/index.html"));
});

app.use("/api/shorturl/", shortUrlRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
module.exports = app;
