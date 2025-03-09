"use client";
import { useSidebar } from "@/app/admin/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";

type NavItem = {
  name: string;
  icon: string;
  path: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: "/images/admin/icons/grid.svg",
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: "/images/admin/icons/user-circle.svg",
    name: "Users",
    path: "/admin/users",
  },
];

const otherNavItems: NavItem[] = [
  {
    icon: "/images/admin/icons/group.svg",
    name: "Admin Users",
    path: "/admin/admin-users",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex  ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image className="block" src="/images/admin/logo.svg" alt="Logo" width={150} height={40} />
            </>
          ) : (
            <Image src="/images/admin/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <p className="mb-2 text-xs uppercase flex leading-[20px] text-gray-400 justify-start font-semibold">MENU</p>
        <nav className="list-none flex flex-col gap-4">
          {navItems.map((nav, index) => (
            <li key={index}>
              <Link
                href={nav.path}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isActive(nav.path) ? "bg-sky-100" : "hover:bg-gray-100"}`}
              >
                <Image src={nav.icon} alt={nav.name} width={24} height={24} />
                <span className={`text-sm font-bold`}>{nav.name}</span>
              </Link>
            </li>
          ))}
        </nav>
        <p className="mb-2 text-xs uppercase flex leading-[20px] text-gray-400 justify-start font-semibold mt-6">
          OTHER
        </p>
        <nav className="list-none flex flex-col gap-4">
          {otherNavItems.map((nav, index) => (
            <li key={index}>
              <Link
                href={nav.path}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isActive(nav.path) ? "bg-sky-100" : "hover:bg-gray-100"}`}
              >
                <Image src={nav.icon} alt={nav.name} width={24} height={24} />
                <span className={`text-sm font-bold`}>{nav.name}</span>
              </Link>
            </li>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
