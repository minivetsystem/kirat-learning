"use client";

import React from "react";
import Link from "next/link";
import {  usePathname } from "next/navigation";

import MobileMenu from "./MobileMenu";

export default function Navbar() {
const pathname = usePathname()


  return (
    <header className="bg-white ">
    {/* Top Header */}
    <div className="border-b  py-2">
      <div className="container max-w-screen-xl mx-auto px-4 flex justify-between items-center">
      
        <Link href="/" className="w-36">
          <img src="./Logo.png" alt="Kirat Learning App" title="Kirat Learning App" />
        </Link>
        <ul className="hidden md:flex space-x-4 text-sm text-gray-700">
          <li>
            <Link href="/contact-us" className="hover:text-gray-900">Contact us</Link>
          </li>
          {/* <li className="border-l border-gray-500 pl-4">
            <Link href="/underconstruction" className="hover:text-gray-900">Sign In</Link>
          </li> */}
        </ul>
        <div className="md:hidden">
        <MobileMenu />
          </div>
      </div>
    </div>
  
 
    <div className="py-3 hidden md:block">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-wrap items-center justify-between">
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
            <Link href="/comingsoon" className={` ${pathname === "/comingsoon" ? "border-b-2 border-orange-500 text-gray-900 font-medium" : ""}`}>Blogs</Link>
          </li>
        </ul> 
      </div>
    </div>
   

  </header>
  
  );
}
