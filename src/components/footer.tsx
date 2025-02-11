"use client";

import { Github, Linkedin, Send, Twitter } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { myData, socialLink } from "@/constants/data";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import GitHubActivityCalendar from "./ui/gitHubActivityCalendar";
import { Button } from "./ui/button";
function Footer() {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";
  const fallBackName = `${myData.fullName.firstName.at(
    0
  )}${myData.fullName.lastName.at(0)}`;
  return (
    <div className="flex border-t divide-x">
      <div className="px-5 py-3 text-nowrap flex-1 sm:!basis-0  flex-grow">
        <h3>find me in :</h3>
      </div>
      <div className="flex  sm:justify-between  h-full sm:flex-shrink-0 sm:flex-1  divide-x">
        <div className="flex divide-x h-full border-x">
          {socialData.map((item) => {
            return (
              <div key={item.key}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div key={item.key} className="px-4 py-3 hover:text-main">
                      <h3>{item.icon}</h3>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarImage src={item.imageUlr} />
                          <AvatarFallback>{fallBackName}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-sm text-white">
                            {socialLink.github.username}
                          </h4>
                          <h3>{item.name}</h3>
                        </div>
                      </div>
                      <Button>Visit</Button>
                    </div>

                    <div className="flex justify-between space-x-4">
                      <p className="text-sm">{item.bio}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            );
          })}
        </div>
        <div className="">
          <HoverCard>
            <HoverCardTrigger>
              <div className="px-5 py-3 flex gap-2 hover:text-main">
                <h3 className=" hidden sm:block -m-l-[1px]">
                  @{socialLink.github.username}
                </h3>
                <Github />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className=" min-w-80 w-full me-1">
              <div className="flex justify-between mb-5">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage
                      src={`https://github.com/${socialLink.github.username}.png`}
                      alt="gtihub image"
                    />
                    <AvatarFallback>{fallBackName}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm text-white">
                      {socialLink.github.username}
                    </h4>
                    <h3>
                      {myData.fullName.firstName} {myData.fullName.lastName}
                    </h3>
                  </div>
                </div>
                <Button>Visit</Button>
              </div>
              <GitHubActivityCalendar
                token={GITHUB_TOKEN}
                username="realKhusan"
              />
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}

export default Footer;

const socialData = [
  {
    key: "1",
    name: "twitter",
    bio: "🍀 With great power comes great responsibilities",
    username: socialLink.twitter.username,
    imageUlr: `https://unavatar.io/x/elonmusk`,
    icon: <Twitter />,
  },
  {
    key: "2",
    name: socialLink.telegram.name,
    username: socialLink.telegram.username,
    bio: "🍀 With great power comes great responsibilities",
    imageUlr: `https://unavatar.io/telegram/realkhusan`,
    icon: <Send />,
  },
  {
    key: "3",
    name: "linkedin",
    username: socialLink.linkedin.username,
    bio: "🍀 With great power comes great responsibilities",
    imageUlr:
      "https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png",
    icon: <Linkedin />,
  },
];
