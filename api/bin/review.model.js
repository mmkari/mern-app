const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Review = new Schema({
  movieId: {
    type: String,
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
  },
});
module.exports = mongoose.model("Review", Review);
