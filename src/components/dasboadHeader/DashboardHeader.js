"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";





export default function DashboardHeader() {
  const router = useRouter();
  const [isModel, setIsModel] = useState(false);
  const [isDark, setIsDark] = useState(false)

  const handleModel = () => {
    setIsModel(!isModel);
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="flex flex-none overflow-hidden w-full px-10 py-2 justify-between border border-gray-200">
        <div className="flex gap-2 items-center">
        <img src="/Logo.png" className="mr-3 h-14" alt="Kirat IT Solution" title='Kirat IT Solution' />
        </div>
        <div className="flex gap-2 items-center">
        {/* <Switch checked={isDark} onCheckedChange={setIsDark}/> */}
      
        </div>
        
      </header>
    </>
  );
}
