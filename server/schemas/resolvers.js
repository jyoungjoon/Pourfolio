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
        model: 'Wine',
      });
    },
    review: async (parent, { wineId }) => {
      return await Review.findOne({ wine: wineId });
    },
    reviews: async (parent, { userId }) => {
      return await Review.find({ user: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { email, password, confirmPassword }) => {
      console.log(password, confirmPassword);
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords must match. Please try again.');
      }

      try {
        const user = await User.create({ email, password });
        const cellar = await Cellar.create({ user: user._id, wines: [] });
        user.cellar = cellar._id;
        await user.save();
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
          throw new Error(
            'That email address is already in use. Please use a different email.'
          );
        } else {
          throw new Error('An error occurred while creating the user.');
        }
      }
    },

    deleteUser: async (parent, { userId }) => {
      const user = await User.findByIdAndDelete(userId);
      return `${user ? 'deleted' : 'failed'}`;
    },

    login: async (parent, { email, password, confirmPassword }) => {
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

    updatePassword: async (
      parent,
      { userId, currentPassword, newPassword }
    ) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const isPasswordValid = await user.isCorrectPassword(currentPassword);
      if (!isPasswordValid) {
        throw new AuthenticationError('Incorrect current password');
      }

      user.password = newPassword;
      await user.save();

      return 'updated';
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

        if (!wine) {
          return 'There was an error with our database. Please try again.';
        }

        if (!user) {
          return 'You must login first.';
        }

        if (!user.cellar) {
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

    saveReview: async (parent, { wineId, userId, rating, experience }) => {
      try {
        const user = await User.findById(userId).populate('reviews');

        const existingReview = user.reviews.find(
          (review) => review.wine.toString() === wineId
        );

        if (existingReview) {
          if (
            existingReview.rating !== rating &&
            rating !== '' &&
            rating !== null &&
            rating !== undefined &&
            rating !== 0
          ) {
            existingReview.rating = rating;
          } else {
            existingReview.rating = existingReview.rating;
          }

          if (
            existingReview.experience !== experience &&
            experience !== '' &&
            experience !== null &&
            experience !== undefined
          ) {
            existingReview.experience = experience;
          } else {
            existingReview.experience = existingReview.experience;
          }

          try {
            const updatedReview = await existingReview.save();
            console.log('Review updated successfully.');
            return updatedReview;
          } catch (error) {
            console.error('Error updating the review. Try again.');
          }
        } else {
          const wineReview = await Review.create({
            user: userId,
            wine: wineId,
            rating: rating,
            experience: experience,
          });

          await wineReview.save();

          if (!user.reviews) {
            user.reviews = [];
          }

          user.reviews.push(wineReview);

          await user.save();
          return wineReview;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
