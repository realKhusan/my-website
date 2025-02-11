"use client";

import { useState, useEffect } from "react";

// Tailwind CSS breakpointlari
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type Breakpoint = keyof typeof breakpoints;

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint) =>
    screenSize.width >= breakpoints[breakpoint];

  const getBreakpoint = () => {
    const currentBreakpoint = (Object.keys(breakpoints) as Breakpoint[])
      .reverse()
      .find(isBreakpoint);
    return currentBreakpoint || "xs";
  };

  return {
    width: screenSize.width,
    height: screenSize.height,
    isBreakpoint,
    getBreakpoint,
    isSmallerThan: (breakpoint: Breakpoint) =>
      screenSize.width < breakpoints[breakpoint],
    isLargerThan: (breakpoint: Breakpoint) =>
      screenSize.width > breakpoints[breakpoint],
    isSmallerOrEqual: (breakpoint: Breakpoint) =>
      screenSize.width <= breakpoints[breakpoint],
    isLargerOrEqual: (breakpoint: Breakpoint) =>
      screenSize.width >= breakpoints[breakpoint],
  };
}
