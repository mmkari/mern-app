let Review = require("../models/review.model");
let Movie = require("../models/movie.model");

module.exports = {
  find: function (req, res, next) {
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
  },
  findById: function (req, res, next) {
    const id = req.params.id;
    Review.findById(id)
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  create: function (req, res) {
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
  },
  update: function (req, res, next) {
    const id = req.params.id;

    Review.findByIdAndUpdate(id, req.body, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  remove: function (req, res, next) {
    const id = req.params.id;

    // Review.deleteMany({ _id: { $in: allIds } })
    //   .exec()
    //   .then((result) => {
    //     res.status(200).json(result);
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err });
    //   });
    // });

    Review.remove({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ error: err });
      });
  },

  aggregate_averageRatingByMovie: function (req, res, next) {
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
  },
};
