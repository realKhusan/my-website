"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Sidebar from "./_sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-full w-full">
      <ResizablePanel defaultSize={15} minSize={14}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80} minSize={80}>
        <div className="h-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
