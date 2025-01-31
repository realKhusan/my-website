import { Github, Twitter } from "lucide-react";
import React from "react";
function Footer() {
  return (
    <div className="flex border-t divide-x text-purple-500">
      <div className="px-5 py-3">
        <h3>find me in :</h3>
      </div>
      <div className="flex justify-between flex-shrink-0 flex-grow divide-x">
        <div className="flex h-full divide-x">
          <Twitter className=" aspect-square h-full" />
          <Twitter />
          <Twitter />
        </div>
        <div className="px-5 py-3 flex">
          <h3>salom</h3>
          <Github />
        </div>
      </div>
    </div>
  );
}

export default Footer;
