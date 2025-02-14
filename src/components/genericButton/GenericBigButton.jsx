"use client";
import React from "react";
// import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GenericBigButton({ url, name }) {
  const router = useRouter();
  return (
    <div className="text-center">
      <button
        className="bg-primary-orange inline-flex items-center p-2 px-8 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 font-semibold md:text-2xl text-xl transition ease-in-out delay-150 hover:-translate-1 hover:scale-110  duration-300"
        onClick={() => router.push(`${url}`)}
      >
        <span>{name}</span>
        {/* <ChevronRight className="w-0 group-hover:w-10 group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out" /> */}
      </button>
    </div>
  );
}
