import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Poppins } from 'next/font/google';

import Footer from "@/components/footer/Footer";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Include the weights you need
  variable: '--font-poppins', // Define a CSS variable for the font
});
export const metadata = {
  title: "Kirat IT",
  description: "We are a rapidly emerging company harnessing the best in Product Development and IT Services from the leading platforms - SAP, Data, Integration and Opensource to serve end-to-end business process, consulting, implementation with managed service solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`} suppressHydrationWarning={true} >
        <Navbar />
        <div className="relative overflow-hidden">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
