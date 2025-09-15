import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/cn";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className={cn("pb-4", headerClassName)}>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </CardHeader>
      <CardContent className={cn("space-y-4", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
