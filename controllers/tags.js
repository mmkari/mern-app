let Tag = require("../models/tag.model");

const getIdsRecursively = async (parentId) => {
  const result = [parentId]; // add this ID to list
  const children = await Tag.find({ parentId: parentId }).exec();

  // get IDs of children
  const promises = [];
  children.forEach((child) => {
    promises.push(getIdsRecursively(child._id));
  });
  // return flattened array of IDs
  return Promise.all(promises).then((arrays) => {
    return arrays.reduce((a, b) => [...a, ...b], result);
  });
};

module.exports = {
  find: function (req, res, next) {
    Tag.find()
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
    Tag.findById(id)
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  create: function (req, res) {
    let tag = new Tag(req.body);
    tag
      .save()
      .then((tag) => {
        res.status(200).json(tag);
      })
      .catch((err) => {
        res.status(400).send("adding failed");
      });
  },
  update: function (req, res, next) {
    const id = req.params.id;

    Tag.findByIdAndUpdate(id, req.body, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  remove: function (req, res, next) {
    const id = req.params.id;
    // before deleting a node, we need to collect all ids of its children and remove those too
    getIdsRecursively(id).then((allIds) => {
      Tag.deleteMany({ _id: { $in: allIds } })
        .exec()
        .then(() => {
          res.status(200).json(allIds);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  },
};
