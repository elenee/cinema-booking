import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Archivo } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BookingProvider } from "@/providers/booking-provider";

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
      <body className={`${archivo.className} flex min-h-screen flex-col bg-background`}>
        <QueryProvider>
          <AuthProvider>
            <BookingProvider>
              <div className="absolute inset-x-0 top-0 z-50">
                <Navbar />
              </div>
              <div className="flex-1">{children}</div>
              <Footer />
            </BookingProvider>

          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}