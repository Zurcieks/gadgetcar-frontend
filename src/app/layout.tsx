"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { Toaster } from "@/app/components/ui/toaster";
import store from "../redux/store";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  useEffect(() => {
    if (!sessionStorage.getItem('anonymousId')) {
      const anonymousId = `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('anonymousId', anonymousId);
    }
  }, []);
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
    
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <main className="flex-1 overflow-y-auto overflow-x-auto">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
