import type { Metadata } from "next";

import "./globals.css";

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
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
