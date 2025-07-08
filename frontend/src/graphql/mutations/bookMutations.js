import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddBook($data: AddBookInput!) {
    addBook(data: $data) {
      id
      userId
      title
      author
      year
      genre
    }
  }
`;

export const UPDATE_BOOK = gql`
mutation UpdateBook($id: ID!, $data: AddBookInput!){
updateBook(id: $id, data:$data){
id
title
author
year
genre
}

}`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    removeBook(id: $id)
  }
`;