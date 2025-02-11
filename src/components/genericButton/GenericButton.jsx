"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GenericButton({ url, name }) {
  const router = useRouter();
  return (
    <div>
      <button
        className="flex bg-primary-orange items-center p-2 px-4 ml-1 text-sm text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 font-semibold group hover:pr-2 transition-all duration-200 ease-in-out"
        onClick={() => router.push(`${url}`)}
      >
        <span>{name}</span>
        <ChevronRight className="w-0 group-hover:w-10 group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out" />
      </button>
    </div>
  );
}
