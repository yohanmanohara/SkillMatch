"use client";
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Ensure the component renders only after it is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevents mismatches during hydration
  }

  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
