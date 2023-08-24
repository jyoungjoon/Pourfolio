const mongoose = require("mongoose");
const Cellar = require("./Cellar");

const { Schema } = mongoose;

const wineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: String,
  },
  pictureUrl: {
    type: String,
  },
  cellar: { type: Schema.Types.ObjectId, ref: "Cellar" },
});

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;
