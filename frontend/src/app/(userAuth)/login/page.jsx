"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔐 Logging in with:", formData);

    // 🔜 Replace this with actual login API call
    const fakeToken = "mock-jwt-token";

    // Save token to localStorage
    localStorage.setItem("token", fakeToken);

    // Redirect to books page
    router.push("/books");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom align="center">
          🔐 Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link href="/register">
              <Typography
                color="primary"
                component="span"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Register
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
