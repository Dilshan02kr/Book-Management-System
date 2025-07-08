'use client';

import { useEffect, useState } from 'react';

export default function useAuth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const isAuthenticated = !!token;

  return { token, isAuthenticated };
}
