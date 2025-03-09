"use client";

import AppHeader from "@/app/admin/_components/layout/AppHeader";
import AppSidebar from "@/app/admin/_components/layout/AppSidebar";
import Backdrop from "@/app/admin/_components/layout/Backdrop";
import { useSidebar } from "@/app/admin/context/SidebarContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen ? "ml-0" : isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
