'use client';

import { Typography, Container, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Page() {
  return (
    <Container maxWidth="md">
      <Box mt={6} mb={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          📚 Book List
        </Typography>
        <Typography variant="subtitle1">
          Browse and manage all your books.
        </Typography>
      </Box>

      <Box>
        <Typography variant="body1" color="textSecondary">
          (Books will be displayed here after GraphQL integration.)
        </Typography>
      </Box>

      <Box mt={4} textAlign="center">
        <Link href="/books/add">
          <Button variant="contained" color="primary">
            ➕ Add New Book
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
