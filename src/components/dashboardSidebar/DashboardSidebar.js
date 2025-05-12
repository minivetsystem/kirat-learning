"use client";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";










export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* old sidebar design */}
       <div className="border-x w-48 h-screen  pl-5 pr-0 border-x-gray-200 fixed">
       
        <div className=" py-3">
       
        </div>
      </div>


     

    </>
  );
}
