"use client";

import { useState, useEffect } from "react";
import { MOBILE_BREAKPOINT } from "@/constants/layout";

const useBreakMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const matchPoint = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    matchPoint.addEventListener("change", onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => matchPoint.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
};

export default useBreakMobile;
