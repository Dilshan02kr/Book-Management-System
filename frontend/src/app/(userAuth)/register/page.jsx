"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/authForm/AuthForm";
import { registerUser } from "@/services/authService";
import CustomAlert from "@/components/customAlert/CustomAlert";
import { Container } from "@mui/material";
import BackButton from "@/components/backButton/BackButton";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await registerUser(formData);

    if (result.success) {
      setAlert({
        show: true,
        type: "success",
        message: "Registration successful!",
      });
      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 1500);
    } else {
      setAlert({
        show: true,
        type: "error",
        message: "Registration failed. Username might be taken.",
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

      <BackButton />

      <AuthForm
        title="📝 Register"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText="Register"
        bottomText="Already have an account?"
        linkText="Log in"
        linkHref="/login"
        loading={loading}
      />
    </Container>
  );
}
