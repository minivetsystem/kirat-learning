"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import "../globals.css";
import LoginForm from "@/components/auth/LoginForm";
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      console.log("Login success", formData);
    } catch (err) {
      console.error("Login error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex gap-2 flex-col w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="relative w-28 pt-6  mx-auto  ">
            <img
              src="/Logo.png"
              alt="Kirat Learning"
              className="object-contain"
            />
          </div>
          <div className="p-3 space-y-4 md:space-y-6 sm:p-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
