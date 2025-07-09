"use client";

import { useEffect, useMemo, useState } from "react";
import AuthNavIcon from "@/components/authNavIcon/AuthNavIcon";
import AuthGuard from "@/wrappers/AuthGuard";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Pagination,
  Alert,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { getBooksByUser } from "@/services/bookService";
import LoadingEffect from "@/components/loadingEffect/loadingEffect";
import EmptyMessage from "@/components/emptyMessage/EmptyMessage";
import MyButton from "@/components/myButton/MyButton";

export default function Page() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    async function fetchBooks() {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError("User not found in localStorage");
        setLoading(false);
        return;
      }

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

  const filteredBooks = useMemo(() => {
    const query = searchText.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );
  }, [books, searchText]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <AuthGuard>
      <AuthNavIcon />

      <Container maxWidth="md">
        <Box mt={6} mb={4} textAlign="center">
          <Typography variant="h3" gutterBottom>
            📚 My Books
          </Typography>
          <Typography variant="subtitle1">
            Browse and manage all your books.
          </Typography>
        </Box>

        <Box>
          <Box mb={3}>
            <TextField
              label="Search books"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by title, author, or genre"
            />
          </Box>

          {loading && <LoadingEffect text="Loading your books..." />}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && books.length === 0 && (
            <EmptyMessage text="No books found." />
          )}

          {!loading && !error && currentBooks.length > 0 && (
            <>
              <List className="book-list">
                {currentBooks.map((book) => (
                  <Box key={book.id}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Link href={`/books/${book.id}`}>
                          <MyButton name="View" />
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

              <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Box>

        <Box mt={4} textAlign="center">
          <Link href="/books/add">
            <MyButton name="➕ Add New Book" />
          </Link>
        </Box>
      </Container>
    </AuthGuard>
  );
}
