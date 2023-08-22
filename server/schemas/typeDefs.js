const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Wine {
    _id: ID
    name: String
    county: String
    color: String
    price: String
    pictureUrl: String
  }

  type Cellar {
   _id: ID
    user: [User]
    wine: [Wine]
  }

  type Review {
    _id: ID
    rating: Number
    wine: [Wine]
    user: [User]
    comment: String
  }

  type User {
    _id: ID
    email: String
    password: String
    cellar: [Cellar]
    review: [Review]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    review: Review
    wine: Wine
    user: User
    cellar: Cellar
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    // TODO how to add wine specifically to cellar
    // TODO how to add revuew specifically to wine
    addReview(reviews: [ID]!, rating: Number!): Review
    updateUser(email: String, password: String): User
    deleteUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
