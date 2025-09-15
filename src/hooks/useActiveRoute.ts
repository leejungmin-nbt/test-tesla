"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useActiveRoute = () => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return (href: string) => {
      // 정확히 일치하는 경우
      if (pathname === href) {
        return true;
      }

      if (href !== "/" && pathname.startsWith(href + "/")) {
        return true;
      }

      return false;
    };
  }, [pathname]);

  return { pathname, isActive };
};
