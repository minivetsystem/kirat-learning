import "./globals.css";
// import Navbar from "@/components/navbar/Navbar";
import { Poppins } from 'next/font/google';

import Footer from "@/components/footer/Footer";
import NavbarTwo from "@/components/navbar/NavbarTwo";
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
        <NavbarTwo />
        <div className="relative overflow-hidden pt-20">
          <img
            src="/bgimg1.png"
            alt="Background Image 3"
            className="absolute -z-50"
            style={{
              width: "1062.03px",
              height: "922.95px",
              top: "0",
              left: "0",
              opacity: 1,
              transform: "rotate(58.51deg)",
            }}
          />
          <img
            src="/bgimg2.png"
            alt="Background Image 2"
            className="absolute -z-50"
            style={{
              top: "220px",
              right: "-0",
              opacity: "0.5",
              transform: "rotate(-360.21deg)",
            }}
          />
          <img
            src="/bgimg3.png"
            alt="Background Image 1"
            className="absolute"
            style={{
              width: "680.3px",
              height: "553.51px",
              top: "1284px",
              left: "-529px",
              opacity: 1,
              transform: "rotate(-183.63deg)",
            }}
          />
          <img
            src="/bgimg1.png"
            alt="Background Image 1"
            className="absolute -z-50"
            style={{
              width: "680.3px",
              height: "553.51px",
              top: "1894px",
              left: "-529px",
              opacity: 1,
              transform: "rotate(-223.63deg)",
            }}
          />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
