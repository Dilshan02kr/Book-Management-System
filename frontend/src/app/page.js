'use client';

import { Typography, Container, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h2" gutterBottom>
          📚 Welcome to Book Management System
        </Typography>
        <Typography variant="h6" gutterBottom>
          Easily manage your books with create, update, and search features.
        </Typography>
        <Box mt={4}>
          <Link href="/books" passHref>
            <Button variant="contained" color="primary">
              Go to Book List
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
