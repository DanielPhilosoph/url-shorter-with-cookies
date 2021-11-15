function errorHandler(err, req, res, next) {
  if (err.status && err.message) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;
