"use client";

import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function BookForm({
  initialData = {
    title: "",
    author: "",
    year: "",
    genre: "",
  },
  onSubmit,
  isEdit = false,
}) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      year: parseInt(formData.year, 10),
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Published Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          {isEdit ? "✏️ Update Book" : "📥 Add Book"}
        </Button>
      </Box>
    </form>
  );
}
