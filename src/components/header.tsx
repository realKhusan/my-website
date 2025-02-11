"use client";

import React, { useMemo, useState } from "react";
import { Tabs } from "./ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { myData } from "@/constants/data";
import { useScreenSize } from "@/hooks/use-screen-size";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
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
  const { isLargerThan, isSmallerThan } = useScreenSize();
  return (
    <div className="flex justify-between border-b items-center sm:divide-x">
      <div className="px-5 py-3 border-r -mr-[1px]">
        <h3 className="text-main text-nowrap lowercase">
          {myData.fullName.firstName}-{myData.fullName.lastName}
        </h3>
      </div>
      {isLargerThan("sm") && (
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      )}
      {isSmallerThan("sm") && (
        <div className="flex-1 px-5 flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="border-none  m-r-2" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
}

export default Header;
