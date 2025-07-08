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

export default function Page() {
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
    console.log("👤 Registering:", formData);

    router.push("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom align="center">
          📝 Register
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
              Register
            </Button>
          </Box>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/login">
              <Typography
                color="primary"
                component="span"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Log in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
