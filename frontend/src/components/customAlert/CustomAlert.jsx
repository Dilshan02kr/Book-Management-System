'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { CheckCircle, Error, Warning, Close } from '@mui/icons-material';

const iconMap = {
  success: <CheckCircle className="alert-icon" />,
  error: <Error className="alert-icon" />,
  warning: <Warning className="alert-icon" />,
};

export default function CustomAlert({ type = 'success', message, duration = 10000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <Box className={`alert-box alert-${type}`}>
      {iconMap[type]}
      <Typography className="alert-text">{message}</Typography>
      <IconButton
        className="alert-close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
      >
        <Close />
      </IconButton>
    </Box>
  );
}
