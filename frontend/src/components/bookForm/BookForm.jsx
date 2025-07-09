"use client";

import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import MyButton from "../myButton/MyButton";

export default function BookForm({
  initialData = {
    userId: "",
    title: "",
    author: "",
    year: "",
    genre: "",
    summary: "",
  },
  onSubmit,
  isEdit = false,
  loading = false,
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
    const storedUser = localStorage.getItem("user");
    const dataToSubmit = {
      ...formData,
      year: parseInt(formData.year, 10),
      userId: JSON.parse(storedUser).id,
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          className="mui-text-field"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          className="mui-text-field"
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          className="mui-text-field"
          label="Published Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          className="mui-text-field"
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          className="mui-text-field"
          label="Summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          fullWidth
        />

        <MyButton
          name={isEdit ? "✏️ Update Book" : "➕ Add Book"}
          type="submit"
          loading={loading}
        />
      </Box>
    </form>
  );
}
