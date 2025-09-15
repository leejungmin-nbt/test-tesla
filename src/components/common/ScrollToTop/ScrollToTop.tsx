"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";

interface ScrollToTopProps {
  showAfter?: number;
  className?: string;
}

const ScrollToTop = ({ showAfter = 300, className }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        // 기본 스타일
        "fixed right-8 bottom-8 z-50 size-12 rounded-full shadow-lg",
        // 호버 및 포커스 효과
        `
          transition-all duration-200 ease-in-out
          hover:scale-110
        `,
        className
      )}
      aria-label="페이지 맨 위로 이동"
      title="맨 위로"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
};

export default ScrollToTop;
