import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Archivo } from "next/font/google";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cinema Booking",
  description: "Cinema booking application",
};

const archivo = Archivo({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}