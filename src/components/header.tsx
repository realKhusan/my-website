import React from "react";
import { Button } from "./ui/button";
import { Github, Moon } from "lucide-react";
function Header() {
  return (
    <div className="pb-20">
      <div className="sm:container fixed w-full z-[100]   sm:left-0 sm:right-0 sm:z-10  sm:top-5 ">
        <div>
          <div className="border-black/20 flex justify-between sm:rounded-sm px-3 py-2 w-full bg-white/65 backdrop-blur-sm border-b  sm:border ">
            <div>Header</div>

            <div className="flex gap-2">
              <Button
                variant={"outline"}
                size={"icon"}
                className="ratio-[1/1] p-1"
              >
                <Github />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className="ratio-[1/1] p-1"
              >
                <Moon />
              </Button>
              <select className="border px-2 rounded-sm" name="" id="">
                {menus.map((menu, index) => (
                  <option className="hover:bg-black" key={index} value={menu}>
                    {menu}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const menus = ["UZ", "EN", "RU"];

export default Header;
