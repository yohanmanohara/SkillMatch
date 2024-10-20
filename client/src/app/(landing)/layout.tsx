
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/landing/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Ensure the system theme is the default
          enableSystem
        >
         <Navbar/>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
