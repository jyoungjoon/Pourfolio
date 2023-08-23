const mongoose = require('mongoose');
const User = require('./User');
const Wine = require('./Wine');

const { Schema } = mongoose;

const reviewSchema = new Schema();

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
