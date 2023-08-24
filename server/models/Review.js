const mongoose = require("mongoose");
const User = require("./User");
const Wine = require("./Wine");

const { Schema } = mongoose;

const reviewSchema = new Schema({
  wine: { type: Schema.Types.ObjectId, ref: "Wine" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  experience: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
