import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddBook($data: AddBookInput!) {
    addBook(data: $data) {
      id
      title
      author
      year
      genre
    }
  }
`;
