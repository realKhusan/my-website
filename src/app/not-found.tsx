"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-full  flex items-center justify-center px-4">
      <div
        className={`max-w-lg w-full text-center transition-opacity duration-5000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-6xl font-bold  mb-2">404</h1>
          <p className="text-xl  mb-4">Page not found</p>
          <p className=" mb-8">
            Sorry, the page you are looking for does not exist. It might have
            been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <Button asChild className="transition-all duration-500">
          <Link href="/">Return to Home Page</Link>
        </Button>
      </div>
    </div>
  );
}
