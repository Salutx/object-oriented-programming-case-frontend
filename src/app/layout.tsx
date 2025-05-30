import { Inter } from "next/font/google";
import "@/global/reset.scss";
import ProvidersGroup from "./ProvidersGroup";
import { Metadata } from "next";

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
      <body className={interFont.variable} cz-shortcut-listen="true">
        <ProvidersGroup>{children}</ProvidersGroup>
      </body>
    </html>
  );
}
