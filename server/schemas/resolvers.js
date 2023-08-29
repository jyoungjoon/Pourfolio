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
    cellar: async (parent, { userId }) => {
      return await Cellar.findOne({ user: userId }).populate({
        path: 'wines',
        model: 'Wine', // Assuming your wine model name is 'Wine'
      });
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

    saveWine: async (parent, { wineId, userId }, context) => {
      try {
        const wine = await Wine.findById(wineId);
        const user = await User.findById(userId).populate({
          path: 'cellar',
          populate: {
            path: 'wines',
            model: 'Wine',
          },
        });

        console.log(user);

        if (!wine) {
          return 'There was an error with our database. Please try again.';
        }

        if (!user) {
          return 'You must login first.';
        }

        if (!user.cellar || user.cellar.length === 0) {
          user.cellar = await Cellar.create({ user: user._id, wines: [] });
          await user.save();
        }

        const cellar = user.cellar;

        if (!cellar.wines) {
          cellar.wines = [];
        }

        const wineInCellarIndex = cellar.wines.findIndex((w) =>
          w.equals(wineId)
        );

        if (wineInCellarIndex !== -1) {
          return 'Wine already exists in the cellar.';
        }

        cellar.wines.push(wine);
        await cellar.save();

        return 'Wine saved successfully.';
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
