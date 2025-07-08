'use client';

import { getBookById } from '@/services/bookService';
import React, { use, useEffect, useState } from 'react'

function page({ params }) {

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const { id } = use(params);

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
}, [id])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {book && (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <p>Genre: {book.genre}</p>
        </div>
      )}
    </div>
  )
}

export default page