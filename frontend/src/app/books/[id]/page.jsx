"use client";

import { use, useEffect, useState } from "react";
import { deleteBookById, getBookById } from "@/services/bookService";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import Link from "next/link";
import LoadingEffect from "@/components/loadingEffect/loadingEffect";
import MyButton from "@/components/myButton/MyButton";
import AuthGuard from "@/wrappers/AuthGuard";

export default function Page({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      const result = await getBookById(id);
      if (result.success) {
        setBook(result.book);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    const result = await deleteBookById(id);
    if (result.success) {
      router.push("/books");
    } else {
      setError(result.error);
    }
  };

  const handleEdit = () => {
    router.push(`/books/edit/${id}`);
  };

  return (
    <AuthGuard isLoadingNeed={false}>
      <Container maxWidth="sm">
        <Box className="details-container" mt={6}>
          <Typography variant="h4" gutterBottom>
            📖 Book Details
          </Typography>

          {loading && <LoadingEffect text="Loading book details..." />}
          {error && <Alert severity="error">Error: {error}</Alert>}

          {book && (
            <Box mt={4} className="book-card">
              <Typography variant="h5" gutterBottom>
                {book.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>
                <strong>Author:</strong> {book.author}
              </Typography>
              <Typography>
                <strong>Published Year:</strong> {book.year}
              </Typography>
              <Typography>
                <strong>Genre:</strong> {book.genre}
              </Typography>
              <Typography className="summary-text">
                <strong>Summary:</strong> {book.summary}
              </Typography>

              <Box mt={4} display="flex" justifyContent="space-between">
                <Link href={`/books/${book.id}/update`}>
                  <Button variant="outlined" color="primary">
                    ✏️ Edit
                  </Button>
                </Link>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  🗑 Delete
                </Button>
              </Box>
            </Box>
          )}
          <Box mt={4} textAlign="center">
            <Link href="/books">
              <MyButton name="⬅ Back to Books" />
            </Link>
          </Box>
        </Box>
      </Container>
    </AuthGuard>
  );
}
