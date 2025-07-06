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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
function Header({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);
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
  const fullName = `${myData.fullName.firstName}-${myData.fullName.lastName}`;
  const handleTabClick = (tabId: string) => {
    setOpenSheet(false);
    setActiveTab(tabId);
    router.push(`${tabId}`);
  };
  const { isLargerThan, isSmallerThan } = useScreenSize();
  return (
    <header className={cn("flex justify-between border-b items-center sm:divide-x z-50 bg-background", className)}>
      <div className="px-5 py-3 border-r -mr-[1px]">
        <h3 className="text-main text-nowrap lowercase">{fullName}</h3>
      </div>

      {isLargerThan("sm") && (
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      )}

      {isSmallerThan("sm") && (
        <div className="flex-1  flex justify-end">
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button
                onClick={() => setOpenSheet(true)}
                className="border-none  m-r-2"
                variant="outline"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:w-[80%] ">
              <SheetHeader className="mb-8">
                <SheetTitle>{fullName}</SheetTitle>
              </SheetHeader>
              <div className="border-t h-full flex-1">
                {tabs.map((item) => (
                  <div
                    key={item.id}
                    className="hover:cursor-pointer px-5 py-3 cursor-pointer border-b text-white font-thin  hover:bg-white/10 transition-all"
                    onClick={() => handleTabClick(item.id)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </header>
  );
}

export default Header;
