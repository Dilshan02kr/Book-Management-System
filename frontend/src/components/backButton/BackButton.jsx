import { Box, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import Link from "next/link";

function BackButton({link = "/"}) {
  return (
    <Box position="fixed" top={16} left={16}>
      <Tooltip title="Back">
        <Link href={link}>
          <IconButton sx={{ color: "#17B8A6" }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );
}

export default BackButton;
