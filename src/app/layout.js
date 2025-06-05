import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata = {
  title: "Kirat Learning",
  description: "This is a learning platform",
};
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <main>{children}</main>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
