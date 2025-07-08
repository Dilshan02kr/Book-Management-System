"use client";

import { Container, Box, Typography } from "@mui/material";
import BookForm from "@/components/bookForm/BookForm";
import { addBook } from "@/services/bookService";
import { useRouter } from "next/navigation";

export default function Page() {

const router = useRouter();

  const handleAddBook = async (data) => {
    const result = await addBook(data);

    if (result.success) {
      alert("✅ Book added!");
      router.push("/books");
    } else {
      alert("❌ Error: " + result.error);
    }
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
