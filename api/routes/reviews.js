const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let Review = require("../models/review.model");
let Movie = require("../models/movie.model");

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";

router.get("/", function (req, res, next) {
  res.send(databaseConnection);
});

router.get("/reviews/aggregate/average_rating_by_movie", function (
  req,
  res,
  next
) {
  const hasQuery = Object.keys(req.query).length !== 0;

  let query = undefined;
  let options = [];
  if (hasQuery) {
    const { movieId } = req.query || {};

    if (movieId) {
      // TODO handle array of IDs
      query = {
        movieId: movieId,
      };
      options.push({ $match: query });
    }
  }

  options.push({
    $group: {
      _id: "$movieId",
      averageRating: { $avg: "$rating" },
    },
  });

  Review.aggregate(options)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/reviews", function (req, res, next) {
  const hasQuery = Object.keys(req.query).length !== 0;

  // TODO external filter param parse
  let query = undefined;
  if (hasQuery) {
    const { movieId } = req.query || {};

    if (movieId) {
      query = {
        movieId: movieId,
      };
    }
  }

  Review.find(query)
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/reviews/:id", function (req, res, next) {
  const id = req.params.id;
  Review.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/reviews/:id", function (req, res, next) {
  const id = req.params.id;
  Review.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ error: err });
    });
});

// // Review.remove({ _id: id })
// Review.deleteMany({ _id: { $in: allIds } })
//   .exec()
//   .then((result) => {
//     res.status(200).json(result);
//   })
//   .catch((err) => {
//     res.status(500).json({ error: err });
//   });
// });

router.patch("/reviews/:id", function (req, res, next) {
  const id = req.params.id;

  Review.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/reviews", function (req, res) {
  Movie.findById(req.body.movieId)
    .exec()
    .then((movie) => {
      // create review
      let review = new Review({
        ...req.body,
        movieId: movie._id,
      });
      review
        .save()
        .then((result) => {
          // NEED TO ADD REVIEW TO CORRESPONDING MOVIE
          movie.reviews.push(result._id);
          movie.save().catch((err) => {
            res.status(500).json({ error: err });
          });

          res.status(200).json(result);
        })
        .catch((err) => {
          console.log("ERR", err);

          res.status(400).send(err);
        });

      // res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
