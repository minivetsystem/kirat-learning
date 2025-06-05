"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Home, FileText, ClipboardPen } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  {
    href: "/dashboard/blogs",
    label: "Manage Blogs",
    icon: FileText,
    activeOn: ["/dashboard/blogs", "/dashboard/addblog", "/dashboard/editblog", ],
  },
  {
    href: "/dashboard/registration",
    label: "Registration",
    icon: ClipboardPen ,
    activeOn: ["/dashboard/registration" ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      className="fixed h-screen w-48 border-x border-gray-200 pl-5 pr-0"
    >
      <ul className="space-y-2 pt-4">
        {links.map(({ href, label, icon: Icon, activeOn }) => {
          const isActive = activeOn
            ? activeOn.some((path) => pathname.startsWith(path))
            : pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "flex gap-2 items-center px-4 py-2 rounded-l-lg hover:bg-gray-100",
                  isActive && "bg-gray-200 font-semibold"
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
