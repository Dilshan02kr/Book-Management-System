'use client';

import { gql, useQuery } from '@apollo/client';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      year
      genre
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="md" style={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>📚 Book List</Typography>
      <List>
        {data.books.map(book => (
          <ListItem key={book.id}>
            <ListItemText
              primary={`${book.title} (${book.year})`}
              secondary={`By ${book.author} • Genre: ${book.genre}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
