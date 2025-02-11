"use client";

import Footer from "@/components/footer";
import { useScreenSize } from "@/hooks/use-screen-size";
import React from "react";

function ClientLayout() {
  const { isLargerThan } = useScreenSize();
  return <>{isLargerThan("sm") && <Footer />}</>;
}

export default ClientLayout;
