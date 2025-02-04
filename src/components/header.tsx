"use client";

import React, { useMemo, useState } from "react";
import { Tabs } from "./ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { myData } from "@/constants/data";
function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const tabs = useMemo(
    () => [
      { id: "/", label: "_hello" },
      { id: "/about-me", label: "_about-me" },
      { id: "/projects", label: "_projects" },
      {
        id: "/contact-me",
        label: "_contact-me",
        className: "ml-auto border-l",
      },
    ],
    []
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`${tabId}`);
  };
  return (
    <div className="flex border-b divide-x">
      <div className="px-5 py-3">
        <h3 className="text-main text-nowrap lowercase">
          {myData.fullName.firstName}-{myData.fullName.lastName}
        </h3>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
    </div>
  );
}

export default Header;
