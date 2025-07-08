import { ADD_BOOK } from "@/graphql/mutations/bookMutations";
import { GET_BOOK_BY_ID, GET_BOOKS } from "@/graphql/queries/bookQueries";
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
