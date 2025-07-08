import { Button, CircularProgress } from "@mui/material";
import React from "react";

function MyButton({ name, loading = false, type = "button" }) {
  return (
    <Button variant="contained" color="primary" type={type}>
      {loading ? <CircularProgress color="inherit" size={24} /> : name}
    </Button>
  );
}

export default MyButton;
