"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem } from "@/components/form/FormItem";

interface CheckBoxFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const CheckBoxForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  description,
  disabled = false,
  required = false,
  className,
}: CheckBoxFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const checkboxId = useId();

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={checkboxId}
    >
      <div
        className={`
          flex items-center space-x-2 transition-opacity
          ${disabled ? "opacity-40" : ""}
        `}
      >
        <Checkbox
          id={checkboxId}
          checked={field.value || false}
          onCheckedChange={field.onChange}
          disabled={disabled}
          className={
            error
              ? `
                border-destructive
                focus-visible:border-destructive
              `
              : ""
          }
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={`
              hover:text-foreground
              cursor-pointer text-sm leading-none font-medium transition-colors
            `}
          >
            {label}
          </label>
        )}
      </div>
    </FormItem>
  );
};

export default CheckBoxForm;
