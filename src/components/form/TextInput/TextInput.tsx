"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/form/FormItem";

interface TextInputProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "url" | "tel";
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const TextInput = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  description,
  disabled = false,
  required = false,
  className,
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const inputId = useId();

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={inputId}
    >
      <Input
        id={inputId}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={
          error
            ? `
              border-destructive
              focus-visible:border-destructive
            `
            : ""
        }
        {...field}
      />
    </FormItem>
  );
};

export default TextInput;
