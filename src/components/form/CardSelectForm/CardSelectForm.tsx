"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { FormItem } from "@/components/form/FormItem";
import { cn } from "@/utils/cn";

export interface CardSelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface CardSelectFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: CardSelectOption[];
  layout?: "vertical" | "horizontal" | "grid";
  maxSelections?: number;
}

const CardSelectForm = <T extends FieldValues = FieldValues>({
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
}: CardSelectFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const groupId = useId();
  const fieldValue: string[] = field.value || [];

  const handleChange = (optionValue: string) => {
    let newValue: string[];

    if (fieldValue.includes(optionValue)) {
      // 이미 선택된 경우: 선택 해제
      newValue = fieldValue.filter((value: string) => value !== optionValue);
    } else {
      // 선택되지 않은 경우: 선택 추가
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
    }

    field.onChange(newValue);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "horizontal":
        return "flex flex-wrap gap-4";
      case "grid":
        return "grid grid-cols-2 gap-4 md:grid-cols-3";
      case "vertical":
      default:
        return "space-y-3";
    }
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
      <div className={getLayoutClasses()}>
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`;
          const isSelected = fieldValue.includes(option.value);

          // 비활성화 조건:
          // 1. 전체적으로 disabled이거나
          // 2. 해당 옵션이 disabled이거나
          // 3. 최대 선택 개수에 도달했고 현재 옵션이 선택되지 않은 경우
          const isDisabled = Boolean(
            disabled ||
              option.disabled ||
              (maxSelections &&
                fieldValue.length >= maxSelections &&
                !isSelected)
          );

          return (
            <div
              key={option.value}
              className={cn(
                "relative transition-all duration-200",
                isDisabled && "opacity-50"
              )}
            >
              <button
                type="button"
                id={optionId}
                onClick={() => !isDisabled && handleChange(option.value)}
                disabled={isDisabled}
                className={cn(
                  "w-full rounded-lg border-2 p-4 text-left transition-all duration-200",
                  "focus:scale-[1.02] focus:shadow-lg focus:outline-none",
                  "hover:shadow-md",
                  "disabled:cursor-not-allowed disabled:hover:shadow-none disabled:focus:scale-100",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : `
                      border-gray-200 bg-white
                      hover:border-gray-300
                    `,
                  error && "border-destructive"
                )}
              >
                <div className="flex items-center space-x-3">
                  {option.icon && (
                    <div
                      className={cn(
                        "flex-shrink-0 transition-colors duration-200",
                        isSelected ? "text-primary" : "text-gray-400"
                      )}
                    >
                      {option.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        isSelected ? "text-primary" : "text-gray-700"
                      )}
                    >
                      {option.label}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0">
                      <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </FormItem>
  );
};

export default CardSelectForm;
