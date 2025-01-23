"use client";

import { Suspense, lazy } from "react";
import { RoundSpinner } from "./spinner";
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <RoundSpinner />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
