let Movie = require("../models/movie.model");
let Tag = require("../models/tag.model");

const resolveDirection = (dir) => {
  if (dir === "DESC") {
    return -1;
  }
  return 1; // if asc or undefined
};

module.exports = {
  find: function (req, res, next) {
    const hasQuery = Object.keys(req.query).length !== 0;
    const { filterTag, sortBy, sortDirection, minRating, maxRating } =
      req.query || {};

    // TODO external filter param parse
    let query = undefined;
    let sorting = undefined;
    const preFilters = []; // filters other than those targeting average rating

    // add filtering for other than rating related filters
    if (filterTag) {
      preFilters.push({
        $match: { tags: { $in: [filterTag] } },
      });
    }

    const options = [
      ...preFilters,
      // aggregate average rating for each movie
      {
        $lookup: {
          from: "reviews",
          let: { review_ids: { $ifNull: ["$reviews", []] } },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$review_ids"] },
              },
            },
            { $project: { rating: "$rating", _id: 0 } },
          ],
          as: "movieReviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $avg: {
              $map: {
                input: "$movieReviews",
                in: "$$this.rating",
              },
            },
          },
        },
      },
      {
        $unset: "movieReviews",
      },
    ];

    // filter movies by average rating here
    if (hasQuery) {
      if (minRating) {
        options.push({
          $match: { averageRating: { $gte: Number(minRating) } },
        });
      }
      if (maxRating) {
        options.push({
          $match: { averageRating: { $lte: Number(maxRating) } },
        });
      }
    }

    // sort movies according to sorting options
    if (sortBy) {
      options.push({ $sort: { [sortBy]: resolveDirection(sortDirection) } });
    }

    // NOTE aggregate drops empty array fields
    Movie.aggregate(options)
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
    Movie.findById(id)
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  create: function (req, res) {
    let movie = new Movie(req.body);
    movie
      .save()
      .then((movie) => {
        res.status(200).json(movie);
      })
      .catch((err) => {
        res.status(400).send("adding new movie failed");
      });
  },
  update: function (req, res, next) {
    const id = req.params.id;

    Movie.findByIdAndUpdate(id, req.body, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ error: err });
      });
  },
  remove: function (req, res, next) {
    const id = req.params.id;
    Movie.remove({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ error: err });
      });
  },
  aggregate_ratingGroups: function (req, res, next) {
    const options = [
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
    ];
    Movie.aggregate(options)
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
