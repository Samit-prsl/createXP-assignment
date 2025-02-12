import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import FloatingSymbols from "@/components/custom/FloatingSymbols";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Job Board",
  description: "Created by samprsl",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <FloatingSymbols />
        </div>
        <div className="relative z-10">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
