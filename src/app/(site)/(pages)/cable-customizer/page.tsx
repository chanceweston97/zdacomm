import React from "react";
import CableCustomizer from "@/components/CableCustomizer";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart Page | ZDA Communications",
  description: "This is Cart Page for ZDA Communications",
  // other metadata
};

const CableCustomizerPage = () => {
  return (
    <>
      <CableCustomizer />
    </>
  );
};

export default CableCustomizerPage;
