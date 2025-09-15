"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner className="toaster group" position="top-center" {...props} />;
};

export { Toaster };
