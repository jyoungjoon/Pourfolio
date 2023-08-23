const { AuthenticationError } = require('apollo-server-express');
const { User, Cellar, Wine, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {};

module.exports = resolvers;
