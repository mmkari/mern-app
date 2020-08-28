const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movies");

router.route("/").get(moviesController.find).post(moviesController.create);

router
  .route("/:id")
  .get(moviesController.findById)
  .patch(moviesController.update)
  .delete(moviesController.remove);

router
  .route("/aggregate/rating_groups")
  .get(moviesController.aggregate_ratingGroups);

module.exports = router;
