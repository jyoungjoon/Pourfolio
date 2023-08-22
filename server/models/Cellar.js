const mongoose = require('mongoose');
const User = require('./User');
const Wine = require('./Wine');

const { Schema } = mongoose;

const cellarSchema = new Schema({
  userId: [User.schema],
  wineId: [Wine.schema]
});

const Cellar = mongoose.model('Cellar', cellarSchema);

module.exports = Cellar;
