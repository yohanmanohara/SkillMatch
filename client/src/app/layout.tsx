
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/spiner.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/layout/ThemeToggle/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import FloatingChatbot from "@/components/landing/chatbot"; // ✅ Import chatbot
import ChatbotIframe from "@/components/landing/ChatbotIframe"; // ✅ Import ChatbotIframe

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SkillMatch",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <ChatbotIframe />
        </ThemeProvider>
      </body>
    </html>
  );
}
