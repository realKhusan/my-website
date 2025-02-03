import { Github, Twitter } from "lucide-react";
import React from "react";
import data from "../../public/data.json";
function Footer() {
  return (
    <div className="flex border-t divide-x text-purple-500">
      <div className="px-5 py-3">
        <h3>find me in :</h3>
      </div>
      <div className="flex justify-between  h-fullflex-shrink-0 flex-grow divide-x">
        {socialData.map((item) => {
          return (
            <div key={item.key} className="px-5 py-3">
              <h3>{item.name}</h3>
            </div>
          );
        })}
        <div className="flex divide-x h-full">
          <Twitter className="mx-3 h-full" />
          <Twitter className="mx-3 h-full" />
          <Twitter className="mx-3 h-full border-r" />
        </div>
        <div className="px-5 py-3 flex">
          <h3>@realKhusan</h3>
          <Github />
        </div>
      </div>
    </div>
  );
}

export default Footer;

const socialData = [{}];
