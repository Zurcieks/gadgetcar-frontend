"use client"

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { Toaster } from "@/app/components/ui/toaster";
import store from "../../redux/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <main className="flex-1 overflow-y-auto overflow-x-auto">{children}</main>
          <Toaster />
        </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
