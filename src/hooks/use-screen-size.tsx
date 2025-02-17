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
  const [screenSize, setScreenSize] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null, // Boshlang‘ich qiymat `null` bo‘lishi kerak
    height: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Sahifa yuklanganda to‘g‘ri qiymat olish
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint) =>
    screenSize.width !== null && screenSize.width >= breakpoints[breakpoint];

  const getBreakpoint = () => {
    if (screenSize.width === null) return "loading"; // Server tarafda `loading` qaytarish
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
      screenSize.width !== null && screenSize.width < breakpoints[breakpoint],
    isLargerThan: (breakpoint: Breakpoint) =>
      screenSize.width !== null && screenSize.width > breakpoints[breakpoint],
    isSmallerOrEqual: (breakpoint: Breakpoint) =>
      screenSize.width !== null && screenSize.width <= breakpoints[breakpoint],
    isLargerOrEqual: (breakpoint: Breakpoint) =>
      screenSize.width !== null && screenSize.width >= breakpoints[breakpoint],
  };
}
