import { Button, CircularProgress } from "@mui/material";
import React from "react";

function MyButton({ name, loading = false, type = "button", onClick = () => {} }) {
  return (
    <Button className="myButton" variant="contained" type={type} onClick={onClick}>
      {loading ? <CircularProgress color="inherit" size={24} /> : name}
    </Button>
  );
}

export default MyButton;
