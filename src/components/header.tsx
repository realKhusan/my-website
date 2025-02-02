"use client";

import React, { useState } from "react";
import { Tabs } from "./ui/tabs";
import { useRouter } from "next/navigation";

function Header() {
  const [activeTab, setActiveTab] = useState("hello");
  const router = useRouter();
  const tabs = [
    { id: "", label: "_hello" },
    { id: "aboutMe", label: "_about-me" },
    { id: "projects", label: "_projects" },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/${tabId}`);
  };
  return (
    <div className="flex border-b divide-x">
      <div className="px-5 py-3">
        <h3 className="text-main text-nowrap">khusan-mirobidov</h3>
      </div>
      <div className="flex justify-between flex-shrink-0 flex-grow divide-x">
        <div className="flex divide-x">
          <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
        </div>
        <div className="px-5 py-3">
          <h3 className="text-main">_contact-me</h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
