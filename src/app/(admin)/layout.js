import DashboardHeader from "@/components/dasboadHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboardSidebar/DashboardSidebar";
import "./../globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className=" flex flex-col overflow-hidden w-full h-screen">
      <DashboardHeader  />
      <div className=" flex overflow-hidden w-full">
      <DashboardSidebar />
        <div className="  ml-48 border-r-gray-200 overflow-auto w-full">{children}</div>

      </div>

   </div>
        
      </body>
    </html>
  );
}
