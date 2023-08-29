const mongoose = require('mongoose');

const User = require('./User');
const Wine = require('./Wine');

const { Schema } = mongoose;

const cellarSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  wines: [{ type: Schema.Types.ObjectId, ref: 'Wine' }],
});

const Cellar = mongoose.model('Cellar', cellarSchema);

module.exports = Cellar;
