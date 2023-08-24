const { AuthenticationError } = require("apollo-server-express");
const { User, Cellar, Wine, Review } = require("../models");
const { signToken } = require("../utils/auth");
const { sign } = require("jsonwebtoken");

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
  },
};

module.exports = resolvers;
