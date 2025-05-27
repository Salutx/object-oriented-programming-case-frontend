import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const interFont = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LibraryDB - by Salutx",
  description:
    "LibraryDB is a free and open-source library management system created by Salutx to UniFECAF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Navbar />
      <body className={interFont.variable}>{children}</body>
    </html>
  );
}
