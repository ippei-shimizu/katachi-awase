import AdminLayout from "@/app/admin/_components/AdminLayout";
import { SidebarProvider } from "@/app/admin/context/SidebarContext";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
