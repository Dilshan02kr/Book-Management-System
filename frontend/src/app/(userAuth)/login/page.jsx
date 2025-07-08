'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/authForm/AuthForm";
import { loginUser } from "@/services/authService";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await loginUser(formData);

    if (result.success) {
      alert('✅ Login successful!');
      router.push('/books');
    } else {
      setError('❌ Invalid username or password');
    }
  };

  return (
    <AuthForm
      title="🔐 Login"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Login"
      bottomText="Don’t have an account?"
      linkText="Register"
      linkHref="/register"
    />
  );
}
