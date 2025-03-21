import AdminLayout from "@/app/admin/_components/AdminLayout";
import { SidebarProvider } from "@/app/admin/context/SidebarContext";
import { Metadata } from "next";
import { Outfit } from "next/font/google";
import React from "react";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "管理画面",
  robots: "noindex",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  if (auth === null) {
    return (
      <html lang="ja">
        <body className={`${outfit.variable}`}>{auth}</body>
      </html>
    );
  }
  return (
    <html lang="ja">
      <body className={`${outfit.variable}`}>
        <SidebarProvider>
          <AdminLayout>{children}</AdminLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}
