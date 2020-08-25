const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let Tag = require("../models/tag.model");

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";

router.get("/", function (req, res, next) {
  res.send(databaseConnection);
});

router.get("/tags", function (req, res, next) {
  Tag.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/tags/:id", function (req, res, next) {
  const id = req.params.id;
  Tag.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

const getIdsRecursively = async (parentId, result) => {
  result.push(parentId);
  const children = await Tag.find({ parentId: parentId }).exec();

  const promises = [];
  children.forEach((child) => {
    promises.push(getIdsRecursively(child._id, result));
  });
  return Promise.all(promises).then((arrays) => {
    return arrays.reduce((a, b) => [...a, ...b], result);
  });
};

router.delete("/tags/:id", function (req, res, next) {
  const id = req.params.id;
  // before deleting a node, we need to collect all ids of its children and remove those too
  let allIds = [];
  getIdsRecursively(id, allIds).then((allIds) => {
    Tag.deleteMany({ _id: { $in: allIds } })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
});

router.patch("/tags/:id", function (req, res, next) {
  const id = req.params.id;

  Tag.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/tags", function (req, res) {
  let tag = new Tag(req.body);
  tag
    .save()
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(400).send("adding failed");
    });
});

module.exports = router;
