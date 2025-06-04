"use client";
import DashboardHeader from "@/components/dasboadHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboardSidebar/DashboardSidebar";
import "./../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
});

export default function RootLayout({ children }) {
  return (
    <div
      className={`${inter.variable} flex flex-col w-full min-h-screen overflow-hidden`}
    >
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <DashboardHeader />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-16 bottom-0 w-48 z-40">
          <DashboardSidebar />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 ml-48 overflow-auto bg-background">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
