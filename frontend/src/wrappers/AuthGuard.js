"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { Box, Typography, CircularProgress } from "@mui/material";
import LoadingEffect from "@/components/loadingEffect/loadingEffect";

function AuthGuard({ children, isLoadingNeed=true }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  return (
    <Box position="fixed" top={0} left={0} right={0} bottom={0}>
      {children}

      {loading && isLoadingNeed && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(2px)",
          }}
        >
          <LoadingEffect text="Authenticating..." />
        </div>
      )}
    </Box>
  );
}

export default AuthGuard;
