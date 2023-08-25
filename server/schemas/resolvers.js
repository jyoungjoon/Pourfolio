const { AuthenticationError } = require('apollo-server-express');
const { User, Cellar, Wine, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    wines: async () => {
      return await Wine.find();
    },
    wine: async (parent, { wineId }) => {
      return await Wine.findOne({ _id: wineId });
    },
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
