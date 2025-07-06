"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { ExternalLinkIcon, Mail, Phone } from "lucide-react";
import { myData, socialLink } from "@/constants/data";
import { Label } from "@/components/ui/form/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UseSctore } from "@/store/store";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface IAccordianData {
  accorValue: string;
  accorTrigger: string;
  accorContent: React.ReactNode;
}

const ContactMe = () => {
  return (
    <div className="space-y-2 *:flex *:items-center *:gap-3">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
        href={`mailto:${myData.email}`}
      >
        <span className="w-4">
          <Mail size={"18"} className="" />
        </span>{" "}
        <p>{myData.email}</p>
      </Link>

      <Link
        target="_blank"
        href={`tel:${myData.phone.code}${myData.phone.number.replace(
          /\s+/g,
          ""
        )}`}
        className="hover:underline"
        rel="noopener noreferrer"
      >
        <span className="w-4">
          <Phone size={"18"} className="" />
        </span>
        <p>{myData.phone.number}</p>
      </Link>
    </div>
  );
};

const FindMeAlso = [
  {
    label: "Telegram Channel",
    url: socialLink.telegramChannael.url,
  },
  {
    label: "Monkeytype profile",
    url: socialLink.monkeytype.url,
  },
  {
    label: "Medium profile",
    url: socialLink.medium.url,
  },
  {
    label: "Pinterest profile",
    url: socialLink.pinterest.url,
  },
  {
    label: "Discord chat",
    url: socialLink.discord.url,
  },
  {
    label: "Leetcode profile",
    url: socialLink.leetCode.url,
  },
  {
    label: "Facebook profile",
    url: socialLink.facebook.url,
  },
];

function Sidebar({ className }: { className?: string }) {
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
    <div className={cn("w-full md:border-r", className)
    } >
      <Accordion type="multiple" className="w-full">
        {getAccordion() !== null &&
          accordianData[getAccordion()]?.map((item: IAccordianData) => (
            <AccordionItem key={item.accorValue} value={item.accorValue}>
              <AccordionTrigger >{item.accorTrigger}</AccordionTrigger>
              <AccordionContent>{item.accorContent}</AccordionContent>
            </AccordionItem>
          ))}
      </Accordion></div >

  );
}

const projectsData = [
  {
    label: "React",
    value: "react",
  },
  {
    label: "Nextjs",
    value: "nextjs",
  },
  {
    label: "Vite",
    value: "vite",
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
    label: "Tailwindcss",
    value: "tailwindcss",
  },
  {
    label: "AntD",
    value: "antd",
  },
  {
    label: "Mui",
    value: "mui",
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
      accorContent: "coming soon",
    },
    {
      accorValue: "value2",
      accorTrigger: "contacts",
      accorContent: <ContactMe />,
    },
  ],
  contactMe: [
    {
      accorValue: "value1",
      accorTrigger: "contacts",
      accorContent: <ContactMe />,
    },
    {
      accorValue: "value2",
      accorTrigger: "find-me-also-in",
      accorContent: (
        <div className="space-y-3">
          {FindMeAlso.map((item) => (
            <Link
              target="_blank"
              key={item.url}
              rel="noopener noreferrer"
              className="flex gap-3 hover:underline"
              href={item.url}
            >
              <span className="w-4">
                <ExternalLinkIcon size={18} />
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      ),
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
