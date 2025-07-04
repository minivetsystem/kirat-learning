"use client"
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa"


export default function FloatingSocials() {
  const [isExpanded, setIsExpanded] = useState(false)

  const socialLinks = [
    {
      icon: <FaWhatsapp size={18} />,
      label: "Whatsapp",
      href: "https://wa.me/918500007126",
      color: "bg-green-600",
    },
    {
      icon: <FaPhone size={18} />,
      label: "+918500007126",
      href: "tel:+918500007126",
      color: "bg-gray-600",
    },
  ]
  return (
     <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`bg-gray-800/90 transition-all duration-0 ease-in-out shadow-lg ${isExpanded ? "rounded-3xl" : "rounded-full"}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={`flex flex-col items-center transition-all duration-100 ease-in-out ${isExpanded ? "p-2" : "py-1"}`}>
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center transition-all duration-300 ease-in-out hover:bg-white/10 rounded-full p-2 ${isExpanded ? "w-44" : ""}`}
            >
              <div
                className={`${link.color} text-white rounded-full flex items-center justify-center flex-shrink-0 w-8 h-8   transition-all duration-300`}
              >
                {link.icon}
              </div>

              {isExpanded && (
                <span className="ml-2 text-white">{link.label}</span>
              )} 
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
