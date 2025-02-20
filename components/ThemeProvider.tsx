'use client';

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent mismatch during hydration
  }

  return (
    <NextThemesProvider defaultTheme="system" enableSystem={true} attribute="data-theme">
      {children}
    </NextThemesProvider>
  );
}
