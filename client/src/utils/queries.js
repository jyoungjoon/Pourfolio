import { gql } from '@apollo/client';

export const GET_ALL_WINE = gql`
  {
    wines {
      _id
      name
      country
      color
      price
      pictureUrl
    }
  }
`;

export const GET_WINE = gql`
  {
    wines {
      name
      country
      color
      price
      pictureUrl
    }
  }
`;

export const GET_CELLAR_BY_USER_ID = gql`
  query GetCellarByUserId($userId: ID!) {
    cellar(userId: $userId) {
      _id
      user {
        _id
      }
      wines {
        _id
        name
        price
        country
        color
        pictureUrl
      }
    }
  }
`;

export const GET_USER_REVIEWS = gql`
  query GetUserReviews($userId: ID!) {
    reviews(userId: $userId) {
      wine {
        _id
      }
      user {
        _id
      }
      rating
      experience
    }
  }
`;
