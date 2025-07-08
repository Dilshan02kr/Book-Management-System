import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      year
      genre
    }
  }
`;

export const GET_USER_BOOKS = gql`
  query GetUserBooks($userId: ID!) {
    booksByUser(userId: $userId) {
      id
      title
      author
      genre
      year
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    book(id: $id) {
      id
      title
      author
      year
      genre
    }
  }
`;
