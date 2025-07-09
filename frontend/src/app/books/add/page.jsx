"use client";

import { Container, Box, Typography } from "@mui/material";
import BookForm from "@/components/bookForm/BookForm";
import { addBook } from "@/services/bookService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomAlert from "@/components/customAlert/CustomAlert";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const router = useRouter();

  const handleAddBook = async (data) => {
    setLoading(true);
    const result = await addBook(data);

    if (result.success) {
      setAlert({
        show: true,
        type: "success",
        message: "✅ Book added successfully!",
      });
      setTimeout(() => {
        setLoading(false);
        router.push("/books");
      }, 1500);
    } else {
      setAlert({
        show: true,
        type: "error",
        message: "❌ Failed to add the book! ",
      });
      setLoading(false);
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
          ➕ Add New Book
        </Typography>
      </Box>
      <BookForm onSubmit={handleAddBook} loading={loading} />
    </Container>
  );
}
