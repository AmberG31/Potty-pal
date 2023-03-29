const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const toiletRouter = require("./routes/toilets");
const tokenChecker = require("./middleware/tokenChecker");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");

const app = express();

// setup for receiving JSON
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// route setup
app.use("/toilets", toiletRouter, tokenChecker);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);
app.use("/toilets", toiletRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
