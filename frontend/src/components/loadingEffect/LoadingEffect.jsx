import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function LoadingEffect({text='Loading...'}) {
  return (
    <Box textAlign="center">
      <CircularProgress color="primary" />
      <Typography mt={2} variant="h6">
        {text}
      </Typography>
    </Box>
  );
}

export default LoadingEffect;
