'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/authForm/AuthForm";
import { registerUser } from "@/services/authService";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await registerUser(formData);

    if (result.success) {
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setError('❌ Registration failed. Username might be taken.');
    }
  };

  return (
    <AuthForm
      title="📝 Register"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Register"
      bottomText="Already have an account?"
      linkText="Log in"
      linkHref="/login"
    />
  );
}
