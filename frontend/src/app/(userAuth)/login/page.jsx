"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/authForm/AuthForm";
import { loginUser } from "@/services/authService";
import { Container } from "@mui/material";
import CustomAlert from "@/components/customAlert/CustomAlert";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await loginUser(formData);

    if (result.success) {
      setAlert({
        show: true,
        type: "success",
        message: "✅ Login successful!",
      });
      setTimeout(() => {
        setLoading(false);
        router.push("/books");
      }, 1500);
    } else {
      setAlert({
        show: true,
        type: "error",
        message: "❌ Invalid username or password",
      });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {alert.show && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          duration={3000}
          onClose={() => setAlert({ show: false, type: "", message: "" })}
        />
      )}

      <AuthForm
        title="🔐 Login"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText="Login"
        bottomText="Don’t have an account?"
        linkText="Register"
        linkHref="/register"
        loading={loading}
      />
    </Container>
  );
}
