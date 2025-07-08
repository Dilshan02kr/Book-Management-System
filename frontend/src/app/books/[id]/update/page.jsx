"use client";

import BookForm from "@/components/bookForm/BookForm";
import { getBookById, updateBookById } from "@/services/bookService";
import { cleanApolloInput } from "@/utils/cleanApolloInput";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

function page({ params }) {

const router = useRouter();

  const { id } = use(params);
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

  const handleUpdate = async (updatedData) => {
    const result = await updateBookById(updatedData.id, cleanApolloInput(updatedData));
    if (result.success) {
      setBook(result.book);
      router.push(`/books/${result.book.id}`);
    } else {
      setError(result.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={6} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          ✏️ Update Book
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {book && <BookForm initialData={book} onSubmit={handleUpdate} isEdit />}
    </Container>
  );
}

export default page;
