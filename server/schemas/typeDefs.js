const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Wine {
    _id: ID
    name: String
    country: String
    color: String
    price: String
    pictureUrl: String
  }

  type Cellar {
    _id: ID
    user: User
    wines: [Wine]
  }

  type Review {
    _id: ID
    rating: Int
    wine: Wine
    user: User
    experience: String
  }

  type User {
    _id: ID
    email: String
    password: String
    cellar: Cellar
    reviews: [Review]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    review(reviewId: ID!): Review
    wine(wineId: ID!): Wine
    wines: [Wine]
    user(userId: ID!): User
    cellar(userId: ID!): Cellar
  }
  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveWine(wineId: ID!, userId: ID!): String
  }
`;

module.exports = typeDefs;
