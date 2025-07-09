"use client";

import BookForm from "@/components/bookForm/BookForm";
import CustomAlert from "@/components/customAlert/CustomAlert";
import LoadingEffect from "@/components/loadingEffect/loadingEffect";
import { getBookById, updateBookById } from "@/services/bookService";
import { cleanApolloInput } from "@/utils/cleanApolloInput";
import {
  Alert,
  Box,
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
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [error, setError] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

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
    setBtnLoading(true);
    const result = await updateBookById(
      updatedData.id,
      cleanApolloInput(updatedData)
    );
    if (result.success) {
      setBook(result.book);
      setAlert({
        show: true,
        type: "success",
        message: "✅ Book updated successfully!",
      });
      setTimeout(() => {
        setBtnLoading(false);
        router.push(`/books/${result.book.id}`);
      }, 1500);
    } else {
      setAlert({
        show: true,
        type: "error",
        message: "❌ Failed to update the book! ",
      });
      setError(result.error);
       setBtnLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {alert.show && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          duration={3000}
          onClose={() => setAlert({ show: false, type: "", message: "" })}
        />
      )}
      <Box mt={6} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          ✏️ Update Book
        </Typography>
      </Box>

      {loading && <LoadingEffect text="Loading book details..." />}
      {error && <Alert severity="error">{error}</Alert>}

      {book && (
        <BookForm
          initialData={book}
          onSubmit={handleUpdate}
          isEdit
          loading={btnLoading}
        />
      )}
    </Container>
  );
}

export default page;
