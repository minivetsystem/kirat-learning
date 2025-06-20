import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "Kirat Learning",
  description: "This is a learning platform",
};
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <main>{children}</main>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
