import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
    register(data: { username: $username, password: $password })
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(data: { username: $username, password: $password }) {
      token
      user {
        id
        username
      }
    }
  }
`;
