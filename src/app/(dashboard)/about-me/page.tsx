import { GradualSpacingText } from "@/components/ui/animate-text/gradual-spaing-text";
import React from "react";

function AboutMe() {
  return <div className="h-full flex-grow flex items-center justify-center flex-col">
    <GradualSpacingText
      text="Coming soon"
      className="text-sm md:text-md lg:text-lg xl:text-2xl"
    />
  </div>;
}

export default AboutMe;
