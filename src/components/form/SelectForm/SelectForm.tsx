"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormItem } from "@/components/form/FormItem";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: SelectOption[];
  maxHeight?: string | number;
}

const SelectForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder = "선택해주세요",
  description,
  disabled = false,
  required = false,
  className,
  options,
  maxHeight,
}: SelectFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const selectId = useId();

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={selectId}
    >
      <Select
        disabled={disabled}
        value={field.value || ""}
        onValueChange={field.onChange}
      >
        <SelectTrigger
          id={selectId}
          className={
            error
              ? `
                border-destructive
                focus-visible:border-destructive
              `
              : ""
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent maxHeight={maxHeight}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};

export default SelectForm;
