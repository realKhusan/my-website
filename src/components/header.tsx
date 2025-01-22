import React from "react";
import { Button } from "./ui/button";
import { Github, Moon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
function Header() {
  return (
    <div className="container fixed  left-0 right-0 z-10  top-5 ">
      <div>
        <div className="border-black/50 flex justify-between rounded-sm px-3 py-2 w-full bg-white/65 backdrop-blur-sm  border ">
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
  );
}

const menus = ["Home", "About", "Contact", "Blog"];

export default Header;
