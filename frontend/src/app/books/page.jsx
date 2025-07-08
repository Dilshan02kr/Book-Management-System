"use client";

import { useEffect, useState } from "react";
import AuthNavIcon from "@/components/authNavIcon/AuthNavIcon";
import AuthGuard from "@/wrappers/AuthGuard";
import {
  Typography,
  Container,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { getBooks, getBooksByUser } from "@/services/bookService";

export default function Page() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      const storedUser = localStorage.getItem("user");
      const result = await getBooksByUser(JSON.parse(storedUser).id);
      if (result.success) {
        setBooks(result.books);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }

    fetchBooks();
  }, []);

  return (
    <AuthGuard>
      <AuthNavIcon />

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
          {loading && (
            <Typography variant="body1" color="textSecondary">
              Loading books...
            </Typography>
          )}

          {error && (
            <Typography variant="body1" color="error">
              Error loading books: {error}
            </Typography>
          )}

          {!loading && !error && books.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              No books found.
            </Typography>
          )}

          {!loading && !error && books.length > 0 && (
            <List>
              {books.map((book) => (
                <Box key={book.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <Link href={`/books/${book.id}`}>
                        <Button variant="contained" color="primary">
                          View
                        </Button>
                      </Link>
                    }
                  >
                    <ListItemText
                      primary={`${book.title} (${book.year})`}
                      secondary={`Author: ${book.author} | Genre: ${book.genre}`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </Box>
              ))}
            </List>
          )}
        </Box>

        <Box mt={4} textAlign="center">
          <Link href="/books/add">
            <Button variant="contained" color="primary">
              ➕ Add New Book
            </Button>
          </Link>
        </Box>
      </Container>
    </AuthGuard>
  );
}
