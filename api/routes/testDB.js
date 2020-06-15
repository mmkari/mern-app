const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let Movie = require("../bin/test.model");
let Tag = require("../bin/tag.model");

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";

router.get("/", function (req, res, next) {
  res.send(databaseConnection);
});

const resolveDirection = (dir) => {
  if (dir === "DESC") {
    return -1;
  }
  return 1; // if asc or undefined
};

router.get("/movies/aggregate/rating_groups", function (req, res, next) {
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
});

router.get("/movies", function (req, res, next) {
  const hasQuery = Object.keys(req.query).length !== 0;

  // TODO external filter param parse
  let query = undefined;
  let sorting = undefined;
  if (hasQuery) {
    const { filterTag, sortBy, sortDirection, minRating, maxRating } =
      req.query || {};

    if (filterTag) {
      query = {
        tags: { $in: [filterTag] },
      };
    }
    if (sortBy) {
      sorting = {
        [sortBy]: resolveDirection(sortDirection),
      };
    }
    if (minRating) {
      query = { ...(query || {}), rating: { $gte: minRating } };
    }
    if (maxRating) {
      query = {
        ...(query || {}),
        rating: { ...(query ? query.rating || {} : {}), $lte: maxRating },
      };
    }
  }

  Movie.find(query)
    .sort(sorting)
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/movies/:id", function (req, res, next) {
  const id = req.params.id;
  Movie.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/movies/:id", function (req, res, next) {
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
});

router.patch("/movies/:id", function (req, res, next) {
  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ error: err });
    });
});

router.post("/movies", function (req, res) {
  let movie = new Movie(req.body);
  movie
    .save()
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      res.status(400).send("adding new movie failed");
    });
});

// Connecting to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/reactproject", {
  useNewUrlParser: true,
});

// If there is a connection error send an error message
mongoose.connection.on("error", (error) => {
  console.log("Database connection error:", error);
  databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
  console.log("Connected to Database!!");
  databaseConnection = "Connected to Database";
});

module.exports = router;
