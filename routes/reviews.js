const express = require("express");
const router = express.Router();

const reviewsController = require("../controllers/reviews");

router.route("/").get(reviewsController.find).post(reviewsController.create);

router
  .route("/:id")
  .get(reviewsController.findById)
  .patch(reviewsController.update)
  .delete(reviewsController.remove);

router
  .route("/aggregate/average_rating_by_movie")
  .get(reviewsController.aggregate_averageRatingByMovie);

router
  .route("/aggregate/rating_groups")
  .get(reviewsController.aggregate_ratingGroups);

module.exports = router;
