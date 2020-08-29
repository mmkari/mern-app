var express = require("express");
var router = express.Router();
var path = require("path");

var usersRouter = require("./users");
var moviesRouter = require("./movies");
var tagsRouter = require("./tags");
var reviewsRouter = require("./reviews");

// include api routes
router.use("/api/users", usersRouter);
router.use("/api/movies", moviesRouter);
router.use("/api/tags", tagsRouter);
router.use("/api/reviews", reviewsRouter);

// serve client for all other routes
router.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
  // res.render("index", { title: "Express" });
});

module.exports = router;
