"use client";

import { File, Folder, Tree } from "@/components/ui/file-tree";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const getAccordion = useCallback(() => {
    if (pathname.includes("/contact-me")) {
      return "contact-me";
    } else if (pathname.includes("/about-me")) {
      return "about-me";
    } else if (pathname.includes("/projects")) {
      return "projects";
    }
    return null;
  }, [pathname]);
  const [accordianTab, setAccordianTab] = useState<string | null>(
    getAccordion()
  );
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-full w-full">
      <ResizablePanel defaultSize={15} minSize={14}>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              <Tree
                className="p-2 overflow-hidden"
                initialSelectedId="7"
                initialExpandedItems={[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                ]}
                elements={ELEMENTS}
              >
                <Folder element="src" value="1">
                  <Folder value="2" element="app">
                    <File value="3">
                      <p>layout.tsx</p>
                    </File>
                    <File value="4">
                      <p>page.tsx</p>
                    </File>
                  </Folder>
                  <Folder value="5" element="components">
                    <Folder value="6" element="ui">
                      <File value="7">
                        <p>button.tsx</p>
                      </File>
                    </Folder>
                    <File value="8">
                      <p>header.tsx</p>
                    </File>
                    <File value="9">
                      <p>footer.tsx</p>
                    </File>
                  </Folder>
                  <Folder value="10" element="lib">
                    <File value="11">
                      <p>utils.ts</p>
                    </File>
                  </Folder>
                </Folder>
              </Tree>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent className="p-3">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80} minSize={80}>
        <div className="h-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

const ELEMENTS = [
  {
    id: "2",
    isSelectable: true,
    name: "appjjj",
    children: [
      {
        id: "3",
        isSelectable: true,
        name: "layout.tsx",
      },
      {
        id: "4",
        isSelectable: true,
        name: "page.tsx",
      },
    ],
  },
  {
    id: "5",
    isSelectable: true,
    name: "components",
    children: [
      {
        id: "6",
        isSelectable: true,
        name: "header.tsx",
      },
      {
        id: "7",
        isSelectable: true,
        name: "footer.tsx",
      },
    ],
  },
  {
    id: "8",
    isSelectable: true,
    name: "lib",
    children: [
      {
        id: "9",
        isSelectable: true,
        name: "utils.ts",
      },
    ],
  },
];

const accordianData = [{}];
