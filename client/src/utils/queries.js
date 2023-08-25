import { gql } from '@apollo/client';

export const GET_ALL_WINE = gql`
  {
    wines {
      _id
      name
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;
