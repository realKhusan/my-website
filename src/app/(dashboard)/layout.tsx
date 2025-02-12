"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Sidebar from "./_sidebar";
import { useScreenSize } from "@/hooks/use-screen-size";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLargerThan } = useScreenSize();
  const pathname = usePathname();
  return (
    <>
      {isLargerThan("md") ? (
        <ResizablePanelGroup
          direction={"horizontal"}
          className="min-h-full w-full"
        >
          <ResizablePanel>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <div className="h-full">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>
          <h1 className="px-5 pt-5 pb-7">{pathname}</h1>
          <Sidebar />
          <div className="h-full">{children}</div>
        </>
      )}
    </>
  );
}
