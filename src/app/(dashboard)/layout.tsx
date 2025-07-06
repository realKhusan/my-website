"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./_sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  return (
    <div className="md:flex h-full md:overflow-hidden">
      <h1 className="  sm:hidden px-5 pb-6 pt-5">{pathname}</h1>
      <Sidebar className="w-full md:!w-[300px]" />
      <div className="w-full md:overflow-y-auto scrollbar">{children}</div>
    </div>
  );
}
