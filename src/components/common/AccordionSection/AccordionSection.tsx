"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

export interface AccordionSectionItem {
  value: string;
  title: string;
  color?: "basic" | "blue" | "green" | "purple";
  children: ReactNode;
}

interface AccordionSectionProps {
  items: AccordionSectionItem[];
  //defaultValue가 빈 배열인 경우 모든 아코디언이 열리며 값이 있는 경우 해당 아코디언이 열립니다.
  defaultValue?: string[];
  className?: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  items,
  defaultValue = [],
  className = "",
}) => {
  const getColorClasses = (color: AccordionSectionItem["color"] = "basic") => {
    switch (color) {
      case "basic":
        return {
          container: "border-border bg-card",
          dot: "bg-muted-foreground",
          title: "text-foreground",
          hover: "hover:bg-muted/50",
        };
      case "blue":
        return {
          container: "border-blue-100 bg-blue-50/30",
          dot: "bg-blue-500",
          title: "text-blue-900",
          hover: "hover:bg-blue-100/50",
        };
      case "green":
        return {
          container: "border-green-100 bg-green-50/30",
          dot: "bg-green-500",
          title: "text-green-900",
          hover: "hover:bg-green-100/50",
        };
      case "purple":
        return {
          container: "border-purple-100 bg-purple-50/30",
          dot: "bg-purple-500",
          title: "text-purple-900",
          hover: "hover:bg-purple-100/50",
        };
      default:
        return {
          container: "border-border bg-card",
          dot: "bg-muted-foreground",
          title: "text-foreground",
          hover: "hover:bg-muted/50",
        };
    }
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultValue}
      className={`
        space-y-4
        ${className}
      `}
    >
      {items.map((item) => {
        const colorClasses = getColorClasses(item.color);

        return (
          <AccordionItem
            key={item.value}
            value={item.value}
            className={`
              rounded-lg border
              ${colorClasses.container}
            `}
          >
            <AccordionTrigger
              className={`
                px-4 py-3
                ${colorClasses.hover}
                hover:no-underline
              `}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`
                    h-2 w-2 rounded-full
                    ${colorClasses.dot}
                  `}
                ></div>
                <span
                  className={`
                    text-sm font-semibold
                    ${colorClasses.title}
                  `}
                >
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">{item.children}</div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default AccordionSection;
