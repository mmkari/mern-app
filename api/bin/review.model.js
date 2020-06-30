const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Review = new Schema({
  movieId: {
    type: { type: Schema.Types.ObjectId, ref: "Movie" },
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
  },
});
module.exports = mongoose.model("Review", Review);
