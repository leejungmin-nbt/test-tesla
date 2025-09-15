"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem } from "@/components/form/FormItem";

export interface CheckBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckBoxGroupFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: CheckBoxOption[];
  layout?: "vertical" | "horizontal";
  maxSelections?: number;
  onCustomChange?: () => void;
}

const CheckBoxGroupForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  description,
  disabled = false,
  required = false,
  className,
  options,
  layout = "vertical",
  maxSelections,
  onCustomChange,
}: CheckBoxGroupFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const groupId = useId();
  const fieldValue: string[] = field.value || [];

  const handleChange = (optionValue: string, checked: boolean) => {
    let newValue: string[];

    if (checked) {
      if (maxSelections === 1) {
        // 단일 선택 모드: 기존 선택을 모두 해제하고 새로운 값만 선택
        newValue = [optionValue];
      } else if (maxSelections && fieldValue.length >= maxSelections) {
        // 최대 선택 개수에 도달한 경우: 변경하지 않음
        return;
      } else {
        // 일반 다중 선택: 배열에 추가
        newValue = [...fieldValue, optionValue];
      }
    } else {
      // 체크 해제된 경우: 배열에서 제거
      newValue = fieldValue.filter((value: string) => value !== optionValue);
    }

    // 커스텀 onChange 콜백이 있으면 실행
    if (onCustomChange) {
      onCustomChange();
    }

    field.onChange(newValue);
  };

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={groupId}
    >
      <div
        className={
          layout === "horizontal" ? "flex flex-wrap gap-6" : "space-y-5"
        }
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`;
          const isChecked = fieldValue.includes(option.value);

          // 비활성화 조건:
          // 1. 전체적으로 disabled이거나
          // 2. 해당 옵션이 disabled이거나
          // 3. 최대 선택 개수에 도달했고 현재 옵션이 선택되지 않은 경우
          const isDisabled = Boolean(
            disabled ||
              option.disabled ||
              (maxSelections &&
                fieldValue.length >= maxSelections &&
                !isChecked)
          );

          return (
            <div
              key={option.value}
              className={`
                ${layout === "horizontal" ? "" : "w-full"}
                transition-opacity
                ${isDisabled ? "opacity-40" : ""}
              `}
            >
              <div
                className={`
                  inline-flex items-center space-x-2 rounded-md p-2 transition-colors
                  ${isDisabled ? "" : "hover:bg-accent/50"}
                `}
              >
                <Checkbox
                  id={optionId}
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleChange(option.value, checked as boolean)
                  }
                  disabled={isDisabled}
                  className={
                    error
                      ? `
                        border-destructive
                        focus-visible:border-destructive
                      `
                      : ""
                  }
                />
                <label
                  htmlFor={optionId}
                  className={`
                    hover:text-foreground
                    cursor-pointer text-sm leading-none font-medium transition-colors
                  `}
                >
                  {option.label}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </FormItem>
  );
};

export default CheckBoxGroupForm;
