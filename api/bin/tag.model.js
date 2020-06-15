const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Tag = new Schema({
  parentId: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});
module.exports = mongoose.model("Tag", Tag);
