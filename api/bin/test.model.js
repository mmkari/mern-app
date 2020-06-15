const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Movie = new Schema({
  title: {
    type: String,
  },
  value: {
    type: String,
  },
  rating: {
    type: Number,
  },
  fixed: {
    type: Boolean,
  },
  updated: {
    type: Date,
  },
  tags: {
    type: [String], // tag IDs
  },
});
module.exports = mongoose.model("Movie", Movie);
