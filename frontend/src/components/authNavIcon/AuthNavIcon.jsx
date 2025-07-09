'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AuthNavIcon() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
      setIsLoggedIn(true);
    } else {
      setUsername('');
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      position="absolute"
      top={16}
      right={16}
      display="flex"
      alignItems="center"
      gap={1}
    >
      <Typography variant="body1" color={isLoggedIn ? '#17B8A6' : 'gray'}>
        {isLoggedIn ? `Welcome, ${username}` : 'Log in'}
      </Typography>
      <Tooltip title={isLoggedIn ? 'Logout' : 'Login'}>
        <IconButton
          onClick={isLoggedIn ? handleLogout : handleLogin}
          sx={{
            color: isLoggedIn ? 'red' : '#17B8A6',
          }}
        >
          {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
