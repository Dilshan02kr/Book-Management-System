"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!token;

  return { token, isAuthenticated, loading };
}
