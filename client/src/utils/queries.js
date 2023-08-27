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
`