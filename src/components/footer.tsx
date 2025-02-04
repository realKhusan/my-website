import { Github, Linkedin, Send, Twitter } from "lucide-react";

import { socialLink } from "@/constants/data";
import React from "react";
function Footer() {
  return (
    <div className="flex border-t divide-x">
      <div className="px-5 py-3">
        <h3>find me in :</h3>
      </div>
      <div className="flex justify-between  h-fullflex-shrink-0 flex-grow divide-x">
        <div className="flex divide-x h-full border-r">
          {socialData.map((item) => {
            return (
              <div key={item.key} className="px-4 py-3">
                <h3>{item.icon}</h3>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-3 flex gap-2">
          <h3>@{socialLink.github.username}</h3>
          <Github />
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
    icon: <Twitter />,
  },
  {
    key: "2",
    name: "telegram",
    icon: <Send />,
  },
  {
    key: "2",
    name: "linkedin",
    icon: <Linkedin />,
  },
];
