"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MessagesSquare, Menu, X, Search } from "lucide-react";

export default function Navbar() {
const pathname = usePathname()

 console.log(pathname)

  return (
    <header className="bg-white ">
    {/* Top Header */}
    <div className="border-b  py-2">
      <div className="container max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="w-36">
          <img src="./Logo.png" alt="Kirat Learning App" title="Kirat Learning App" />
        </Link>
        <ul className="flex space-x-4 text-sm text-gray-700">
          <li>
            <Link href="/contact-us" className="hover:text-gray-900">Contact us</Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link href="/" className="hover:text-gray-900">Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  
    {/* Bottom Header / Navbar */}
    <div className="py-3">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700 text-sm">
          <li>
            <Link href="/" className={`text-gray-900  ${pathname === "/" ? "border-b-2  border-orange-500  font-medium" : ""}   `}>Home</Link>
          </li>
          <li>
            <Link href="about-us" className={` ${pathname === "/about-us" ? "border-b-2 border-orange-500 text-gray-900 font-medium" : ""}`}>About Us</Link>
          </li>
          <li>
            <Link href="training-and-development" className={` ${pathname === "/training-and-development" ? "border-b-2 border-orange-500 text-gray-900 font-medium" : ""}`}>Training & Development</Link>
          </li>
          <li>
            <Link href="leadership-development" className={` ${pathname === "/leadership-development" ? "border-b-2 border-orange-500 text-gray-900 font-medium" : ""}`}>Leadership Development</Link>
          </li>
          <li>
            <Link href="college-placements-and-consulting-services" className={` ${pathname === "/college-placements-and-consulting-services" ? "border-b-2 border-orange-500 text-gray-900 font-medium" : ""}`}>Placements & Consulting</Link>
          </li>
          <li>
            <Link href="/blogs" className={` ${pathname === "/blogs" ? "border-b-2 border-orange-500 text-gray-900 font-medium" : ""}`}>Blogs</Link>
          </li>
        </ul>
  
        {/* Search Bar */}
        <div className="relative border flex items-center px-3 py-2">
          <input
            type="text"
            placeholder="Search for a great book"
            className="outline-none text-sm bg-transparent w-48"
          />
          <button type="submit" >
            <Search className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  </header>
  
  );
}
