'use client';

import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Link from "next/link";
import MyButton from "../myButton/MyButton";

export default function AuthForm({
  title,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  bottomText,
  linkText,
  linkHref,
  loading=false
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom align="center">
          {title}
        </Typography>

        <form onSubmit={onSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
             className="mui-text-field"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
             className="mui-text-field"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />

            <MyButton name={buttonText} loading={loading} type="submit" />
           
          </Box>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            {bottomText}{" "}
            <Link href={linkHref}>
              <Typography
                color="primary"
                component="span"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {linkText}
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
