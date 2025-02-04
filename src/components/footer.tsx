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

  return (
    <div className="flex border-t divide-x">
      <div className="px-5 py-3">
        <h3>find me in :</h3>
      </div>
      <div className="flex justify-between  h-full flex-shrink-0 flex-grow divide-x">
        <div className="flex divide-x h-full border-r">
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
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          @{item.username}
                        </h4>
                        <p className="text-sm">
                          The React Framework – created and maintained by
                          @vercel.
                        </p>
                      </div>
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
                <h3>@{socialLink.github.username}</h3>
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
                    <AvatarFallback>
                      {myData.fullName.firstName.at(0)}
                      {myData.fullName.lastName.at(0)}
                    </AvatarFallback>
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
    username: socialLink.twitter.username,
    icon: <Twitter />,
  },
  {
    key: "2",
    name: "telegram",
    username: socialLink.telegram.username,

    icon: <Send />,
  },
  {
    key: "3",
    name: "linkedin",
    username: socialLink.linkedin.username,

    icon: <Linkedin />,
  },
];
