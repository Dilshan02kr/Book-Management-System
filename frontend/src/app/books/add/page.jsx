'use client';

import { Container, Box, Typography } from '@mui/material';
import BookForm from '@/components/bookForm/BookForm';

export default function Page() {
  const handleAddBook = (data) => {
    console.log('📘 Add book:', data);
    // 🔜 Trigger GraphQL mutation to add book
  };

  return (
    <Container maxWidth="sm">
      <Box mt={6} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          ➕ Add New Book
        </Typography>
      </Box>
      <BookForm onSubmit={handleAddBook} />
    </Container>
  );
}
