import "./../globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Poppins } from "next/font/google";

import Footer from "@/components/footer/Footer";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});
export const metadata = {
  title: "Kirat Learning",
  description:
    "We are a rapidly emerging company harnessing the best in Product Development and IT Services from the leading platforms - SAP, Data, Integration and Opensource to serve end-to-end business process, consulting, implementation with managed service solutions.",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="relative overflow-hidden">{children}</div>
      <Footer />
    </div>
  );
}
