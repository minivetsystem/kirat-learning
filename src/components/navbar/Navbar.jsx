"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MessagesSquare, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDigitalMarketingActive, setIsDigitalMarketingActive] =
    useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const menuItems = [
  //   { name: "Change Management", link: "/change-management" },
  //   { name: "Integration", link: "/integration" },
  //   { name: "Digital Marketing", link: "#" },
  //   { name: "Data", link: "/data" },
  //   { name: "Ecommerce Services", link: "/ecommerce-services" },
  //   { name: "SAP", link: "/sap" },
  //   { name: "Training & Development", link: "/training-and-development" },
  //   { name: "Customized Development", link: "/customized-development" },
  // ];

  const menuItems = [
    { name: "Ecommerce Services", link: "/ecommerce-services" },
    { name: "Digital Marketing", link: "#" },
    { name: "Software Services", link: "#" },
    { name: "Data ", link: "/data" },
    { name: "Training & Development", link: "/training-and-development" },
    { name: "Customized Development", link: "/customized-development" },
  ];

  const digitalMarkting = [
    { name: "Creative", link: "/creative" },
    { name: "Social Media Marketing", link: "/social-media-marketing" },
    { name: "Lead Generation", link: "/lead-generation" },
    { name: "Web Development", link: "/web-development" },
    { name: "App Development", link: "/app-development" },
    { name: "SEO", link: "/seo" },
    { name: "Google Ads", link: "/google-ads" },
    { name: "Content Marketing", link: "/content-marketing" },
    { name: "Content Writing", link: "/content-writing" },
    { name: "Email Marketing", link: "/email-marketing" },
    { name: "WhatsApp Marketing", link: "/whatsapp-marketing" },
  ];

  useEffect(() => {
    const isCurrentPathInMenu = digitalMarkting.some(
      (item) => item.link === pathname
    );

    // Close the submenu if the current path is not in the menu
    if (!isCurrentPathInMenu) {
      setIsSubmenuOpen(false);
    }
  }, [pathname]);

  const toggleSubmenu = () => {
    setIsSubmenuOpen((prev) => !prev);
    setIsDigitalMarketingActive(true);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
    setIsDigitalMarketingActive(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleRequestDemo = () => {
    router.push("/contact-us");
    setIsSubmenuOpen(false);
   
  };

  return (
    <header className="fixed w-full left-0 top-0 z-40  ">
      <nav className="border-gray-200 bg-primary-midnightBlue w-full z-10 py-4">
        <div className="flex flex-row justify-between gap-4  items-center mx-auto max-w-screen-3xl px-10 xl:px-20">
          <div className="flex items-center ">
            <Link href="/" className="flex items-center ">
              <img
                src="/logo.png"
                className="mr-3"
                alt="Kirat IT"
                title="Kirat IT"
              
              />
            </Link>
          </div>

{/* Desltop menu  */}
          <div className="hidden items-center lg:flex ">
            <ul className="flex flex-row gap-4">
              {menuItems.map((item, index) => {
                const isActive =
                  pathname === item.link ||
                  (item.name === "Digital Marketing" &&
                    isDigitalMarketingActive);

                return (
                  <Link
                    key={index}
                    href={item.link}
                      onClick={() => {
                        if (item.name === "Digital Marketing") {
                          toggleSubmenu();
                        } else {
                          closeSubmenu();
                        }
                      }}
                    className={`relative ${
                      isActive
                        ? "items-center text-white bg-primary-700 dark:text-white "
                        : "items-center text-white hover:border-b-primary-orange"
                    }`}
                  >
                    <li
                    >
                      <h4 className="text-xs font-semibold font-poppins text-center ">
                        {item.name}
                      </h4>
                    </li>
                    <div  className={`absolute bottom-0 left-0 right-0 top-5 ${
                      isActive
                        && "items-center text-white bg-primary-700 dark:text-white border-b-2 border-b-primary-orange"
                        
                    }`}></div>
                  </Link>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-8">
            <button
              className="flex gap-2 bg-primary-orange items-center p-2 px-8 ml-1 text-sm text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 font-semibold"
              onClick={handleRequestDemo}
            >
              <MessagesSquare />
              <span>Request Demo</span>
            </button>
            <button
            className="lg:hidden flex items-center text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>
      </nav>
      <div
        className={`transition-all duration-500 ease-in-out absolute w-full  bg-gray-300   ${
          isSubmenuOpen
            ? "max-h-96 opacity-100 visible h-[50px] flex items-center"
            : "max-h-0 opacity-0 invisible h-0"
        }`}
      >
        <ul className="flex flex-row justify-center gap-5 mx-auto ">
          {digitalMarkting.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`relative ${
                pathname === item.link
                  ? " text-primary-midnightBlue bg-primary-700 "
                  : " text-primary-midnightBlue "
              }`}
            >
              <li  className="">
                <h4 className="text-xs font-semibold font-poppins text-center">
                  {item.name}
                </h4>
              </li>
              <div className={`absolute bottom-0 left-0 right-0 top-7 ${
                pathname === item.link
                  && " border-b-4  border-b-primary-midnightBlue items-end"
                  
              }`}></div>
            </Link>
          ))}
        </ul>
      </div>
       {/* mobile menu  */}
       {isMobileMenuOpen && (
  <div className="lg:hidden bg-primary-midnightBlue p-4">
    <ul className="flex flex-col gap-3">
      {menuItems.map((item, index) => (
        <li key={index} className="relative">
          {item.name === "Digital Marketing" ? (
            <>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="block text-white font-semibold w-full text-left"
              >
                {item.name}
              </button>
              {isDropdownOpen && (
                <ul className="mt-2 bg-gray-800 text-white rounded shadow-lg">
                  {digitalMarkting.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="px-4 py-2 hover:bg-gray-700"
                    >
                      <Link href={subItem.link}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
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
