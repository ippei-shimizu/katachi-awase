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
    path: "/admin/dashboard",
  },
  {
    icon: "/images/admin/icons/user-circle.svg",
    name: "Users",
    path: "/admin/users",
  },
  {
    icon: "/images/admin/icons/task.svg",
    name: "Lessons Category",
    path: "/admin/lesson-category",
  },
  {
    icon: "/images/admin/icons/shooting-star.svg",
    name: "Lessons Skill",
    path: "/admin/lesson-skills",
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
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex py-8 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
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
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <p className="mb-2 flex justify-start text-xs leading-[20px] font-semibold text-gray-400 uppercase">MENU</p>
        <nav className="flex list-none flex-col gap-4">
          {navItems.map((nav, index) => (
            <li key={index}>
              <Link
                href={nav.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${isActive(nav.path) ? "bg-sky-100" : "hover:bg-gray-100"}`}
              >
                <Image src={nav.icon} alt={nav.name} width={24} height={24} />
                <span className={`text-sm font-bold`}>{nav.name}</span>
              </Link>
            </li>
          ))}
        </nav>
        <p className="mt-6 mb-2 flex justify-start text-xs leading-[20px] font-semibold text-gray-400 uppercase">
          OTHER
        </p>
        <nav className="flex list-none flex-col gap-4">
          {otherNavItems.map((nav, index) => (
            <li key={index}>
              <Link
                href={nav.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${isActive(nav.path) ? "bg-sky-100" : "hover:bg-gray-100"}`}
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
