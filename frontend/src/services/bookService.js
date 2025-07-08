import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from "@/graphql/mutations/bookMutations";
import { GET_BOOK_BY_ID, GET_BOOKS, GET_USER_BOOKS } from "@/graphql/queries/bookQueries";
import { client } from "@/lib/apolloClient";

export const addBook = async (bookData) => {
  try {
    const token = localStorage.getItem("token");

    const result = await client.mutate({
      mutation: ADD_BOOK,
      variables: { data: bookData },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return { success: true, book: result.data.addBook };
  } catch (error) {
    console.error("❌ Error adding book:", error.message);
    return { success: false, error: error.message };
  }
};

export const getBooks = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await client.query({
      query: GET_BOOKS,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      fetchPolicy: "no-cache",
    });

    return { success: true, books: data.books };
  } catch (error) {
    console.error("❌ Error fetching books:", error.message);
    return { success: false, error: error.message };
  }
};

export const getBookById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await client.query({
      query: GET_BOOK_BY_ID,
      variables: { id },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return { success: true, book: data.book };
  } catch (error) {
    console.error("❌ Error fetching book by ID:", error.message);
    return { success: false, error: error.message };
  }
};

export const getBooksByUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await client.query({
      query: GET_USER_BOOKS,
      variables: { userId },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      fetchPolicy: 'no-cache',
    });

    return { success: true, books: data.booksByUser };
  } catch (error) {
    console.error("❌ Error fetching books by user:", error.message);
    return { success: false, error: error.message };
  }
}


export const updateBookById = async (id, bookData) => {
  try {
    const token = localStorage.getItem("token");

    const result = await client.mutate({
      mutation: UPDATE_BOOK,
      variables: { id, data: bookData },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return { success: true, book: result.data.updateBook };
  } catch (error) {
    console.error("❌ Error updating book:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteBookById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await client.mutate({
      mutation: DELETE_BOOK,
      variables: { id },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting book:", error.message);
    return { success: false, error: error.message };
  }
};
