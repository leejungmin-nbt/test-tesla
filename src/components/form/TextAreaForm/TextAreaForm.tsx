"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormItem } from "@/components/form/FormItem";

interface TextAreaFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  rows?: number;
  maxLength?: number;
}

const TextAreaForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  description,
  disabled = false,
  required = false,
  className,
  rows = 3,
  maxLength,
}: TextAreaFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const textareaId = useId();

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={textareaId}
    >
      <Textarea
        id={textareaId}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
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

export default TextAreaForm;
