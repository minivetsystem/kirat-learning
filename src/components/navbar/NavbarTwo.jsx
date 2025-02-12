"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MessagesSquare, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const submenuRef = useRef(null);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Training & Development", link: "/training-and-development" },
    { name: "Leadership Development", link: "/leadership-development" },
    {
      name: "Placements & Consulting",
      link: "/college-placements-and-consulting-services",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];

  const handleRequestDemo = () => {
    router.push("/contact-us");
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setActiveSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full left-0 top-0 z-40">
      <nav className="border-gray-200 bg-primary-midnightBlue w-full py-2">
        <div className="flex flex-row justify-between gap-4 items-center mx-auto max-w-screen-3xl px-4 lg:px-10 xl:px-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/Logo-01.png"
                className="mr-3 h-12 lg:h-20"
                alt="Kirat IT"
                title="Kirat IT"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <ul className="flex flex-row gap-4">
              {menuItems.map((item, index) => (
                <li key={index} className="relative">
                  <Link
                    href={item.link}
                    onClick={() => setActiveSubmenu(null)}
                    className={`text-white text-sm font-medium ${
                      pathname === item.link
                        ? "border-b-2 border-primary-orange"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Request Demo & Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:gap-8">
            <button
              className="flex items-center gap-2 py-2 px-3 lg:px-8 ml-1 text-xs lg:text-sm text-white bg-primary-orange rounded-full transition ease-in-out delay-150 hover:-translate-1 hover:scale-110  duration-300"
              onClick={handleRequestDemo}
            >
              <MessagesSquare />
              <span>Contact Us</span>
            </button>

            <button
              className="lg:hidden flex items-center text-white"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Submenu (Desktop) */}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary-midnightBlue p-4">
          <ul className="flex flex-col gap-3">
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMobileSubmenu(item.submenu)}
                      className="block text-white font-semibold w-full text-left"
                    >
                      {item.name}
                    </button>
                    {activeMobileSubmenu === item.submenu && (
                      <ul className="mt-2 bg-gray-800 text-white rounded shadow-lg">
                        {submenus[item.submenu].map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="px-4 py-2 hover:bg-gray-700"
                          >
                            <Link href={subItem.link}>{subItem.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.link}
                    className={`block text-white ${
                      pathname === item.link ? "font-semibold" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
