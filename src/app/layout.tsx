import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/app/components/ui/toaster";
export const metadata: Metadata = {
  title: "GadgetCar",
  description: "Odkryj niesamowite gadżety do twojego samochodu",
  icons: "/icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
