import React from "react";

function SocialLink() {
  return (
    <div className="container">
      {myLinks.map((link) => (
        <div key={link.id} className="flex items-center gap-2">
          <div>{link.name}</div>
          <div>{link.icon}</div>
        </div>
      ))}
    </div>
  );
}

const myLinks = [
  {
    id: "github",
    name: "Github",
    url: "",
    icon: "",
  },
  {
    id: "telegram",
    name: "Telegram",
    url: "",
    icon: "",
  },
  {
    id: "linkedin",
    name: "Linkedin",
    url: "",
    icon: "",
  },
  {
    id: "email",
    name: "Email",
    url: "",
    icon: "",
  },
  {
    id: "x",
    name: "X",
    url: "",
    icon: "",
  },
  {
    id: "leetcode",
    name: "Leetcode",
    url: "",
    icon: "",
  },
  {
    id: "reddit",
    name: "Reddit",
    url: "",
    icon: "",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    url: "",
    icon: "",
  },
  {
    id: "monkeyType",
    name: "MonkeyType",
    url: "",
    icon: "",
  },
  {
    id: "telegrmChannel",
    name: "Telegram Channel",
    url: "",
    icon: "",
  },

  {},
];

export default SocialLink;
