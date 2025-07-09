'use client';

import { Typography, Container, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import AuthNavIcon from '@/components/authNavIcon/AuthNavIcon';
import MyButton from '@/components/myButton/MyButton';

export default function Page() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleGoToBooks = () => {
    if (isAuthenticated) {
      router.push('/books');
    } else {
      alert('🔐 Please login to access the book list.');
      router.push('/login');
    }
  };

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
        <AuthNavIcon />
        <Typography variant="h2" gutterBottom>
          📚 Welcome to Book Management System
        </Typography>
        <Typography variant="h6" gutterBottom>
          Easily manage your books with create, update, and search features.
        </Typography>
        <Box mt={4}>
          <MyButton name="Go to Book List" onClick={handleGoToBooks} />
        </Box>
      </Box>
    </Container>
  );
}
