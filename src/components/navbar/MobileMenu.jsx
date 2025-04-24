"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/training-and-development", label: "Training & Development" },
  { href: "/leadership-development", label: "Leadership Development" },
  { href: "/college-placements-and-consulting-services", label: "Placements & Consulting" },
  { href: "/blogs", label: "Blogs" },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-none shadow-none"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
   
    <SheetTitle >Navigation Menu</SheetTitle>
   
        <nav className="mt-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-gray-900 hover:text-orange-600 transition-colors",
                pathname === link.href && "border-b-2 border-orange-500 font-medium"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ul className="flex justify-center py-8 w-full mx-auto space-x-4 text-sm text-gray-700">
          <li>
            <Link href="/contact-us" className="hover:text-gray-900">Contact us</Link>
          </li>
          <li className="border-l border-gray-500 pl-4">
            <Link href="/" className="hover:text-gray-900">Sign In</Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
