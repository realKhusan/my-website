"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Tabs } from "./ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { useScreenSize } from "@/hooks/use-screen-size";
import data from "../../public/data.json";
function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const screenSize = useScreenSize();
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
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);
  useEffect(() => {}, [screenSize]);

  console.log(pathname, "pathname");
  console.log(screenSize, "breakpoint");
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`${tabId}`);
  };
  return (
    <div className="flex border-b divide-x">
      <div className="px-5 py-3">
        <h3 className="text-main text-nowrap lowercase">
          {data.fullName.firstName}-{data.fullName.lastName}
        </h3>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
    </div>
  );
}

export default Header;
