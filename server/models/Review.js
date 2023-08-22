const mongoose = require('mongoose');
const User = require('./User');
const Wine = require('./Wine');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  userId: [User.schema],
  wineId: [Wine.schema],
  comment: {
    type: String
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
