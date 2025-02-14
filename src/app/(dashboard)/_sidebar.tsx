"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
// import { File, Folder, Tree } from "@/components/ui/file-tree";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { Mail, Phone } from "lucide-react";
import { myData } from "@/constants/data";
import { Label } from "@/components/ui/form/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UseSctore } from "@/store/store";
interface IAccordianData {
  accorValue: string;
  accorTrigger: string;
  accorContent: React.ReactNode;
}
function Sidebar() {
  const pathname = usePathname();
  const getAccordion = useCallback(() => {
    if (pathname.includes("/contact-me")) {
      return "contactMe";
    } else if (pathname.includes("/about-me")) {
      return "aboutMe";
    } else if (pathname.includes("/projects")) {
      return "projects";
    }
    return "contactMe";
  }, [pathname]);
  return (
    <Accordion type="multiple" className="w-full">
      {getAccordion() !== null &&
        accordianData[getAccordion()]?.map((item: IAccordianData) => (
          <AccordionItem key={item.accorValue} value={item.accorValue}>
            <AccordionTrigger>{item.accorTrigger}</AccordionTrigger>
            <AccordionContent>{item.accorContent}</AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}

const projectsData = [
  {
    label: "React",
    value: "react",
  },
  {
    label: "Html",
    value: "html",
  },
  {
    label: "CSS",
    value: "css",
  },
  {
    label: "Shadcn/ui",
    value: "shadcn-ui",
  },
  {
    label: "Tailwindui",
    value: "tailwindui",
  },
  {
    label: "AntD",
    value: "antd",
  },
];

function Projects() {
  const { setProjectChecked, projectsChecked } = UseSctore();
  const handleCheckboxChange = (value: string) => {
    setProjectChecked(() =>
      projectsChecked.includes(value)
        ? projectsChecked.filter((item: string) => item !== value)
        : [...projectsChecked, value]
    );
  };
  console.log(projectsChecked, "projects checked");
  return (
    <div className="space-y-2">
      {projectsData.map((item) => (
        <div key={item.value} className="flex items-center space-x-4">
          <Checkbox
            value={item.value}
            id={item.value}
            checked={projectsChecked.includes(item.value)}
            onCheckedChange={() => handleCheckboxChange(item.value)}
          />
          <Label htmlFor={item.value}>{item.label}</Label>
        </div>
      ))}
    </div>
  );
}

const accordianData = {
  aboutMe: [
    {
      accorValue: "value1",
      accorTrigger: "personal-info",
      accorContent:
        // <Tree
        //   className="p-2 overflow-hidden"
        //   initialSelectedId="7"
        //   initialExpandedItems={[
        //     "1",
        //     "2",
        //     "3",
        //     "4",
        //     "5",
        //     "6",
        //     "7",
        //     "8",
        //     "9",
        //     "10",
        //     "11",
        //   ]}
        // >
        //   <Folder value="2" element="app">
        //     <File value="3">
        //       <p>layout.tsx</p>
        //     </File>
        //     <File value="4">
        //       <p>page.tsx</p>
        //     </File>
        //   </Folder>
        //   <Folder value="5" element="components">
        //     <Folder value="6" element="ui">
        //       <File value="7">
        //         <p>button.tsx</p>
        //       </File>
        //     </Folder>
        //     <File value="8">
        //       <p>header.tsx</p>
        //     </File>
        //     <File value="9">
        //       <p>footer.tsx</p>
        //     </File>
        //   </Folder>
        //   <Folder value="10" element="lib">
        //     <File value="11">
        //       <p>utils.ts</p>
        //     </File>
        //   </Folder>
        // </Tree>
        "s",
    },
    {
      accorValue: "value2",
      accorTrigger: "contacts",
      accorContent: <p>Skills</p>,
    },
  ],
  contactMe: [
    {
      accorValue: "value1",
      accorTrigger: "contacts",
      accorContent: (
        <div className="space-y-2 *:flex *:items-center *:gap-3">
          <div className="">
            <span className="w-4">
              <Mail size={"18"} className="" />
            </span>
            <p>{myData.email}</p>
          </div>
          <div className="">
            <span className="w-4">
              <Phone size={"18"} className="" />
            </span>
            <p>{myData.phone.number}</p>
          </div>
        </div>
      ),
    },
    {
      accorValue: "value2",
      accorTrigger: "find-me-also-in",
      accorContent: <div>asdasdsadasd</div>,
    },
  ],
  projects: [
    {
      accorValue: "value1",
      accorTrigger: "projects",
      accorContent: <Projects />,
    },
  ],
};
export default Sidebar;
