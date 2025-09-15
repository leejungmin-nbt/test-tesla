"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { FormItem } from "@/components/form/FormItem";
import { cn } from "@/utils/cn";

export interface SwitchOption {
  key: string;
  label: string;
}

interface SwitchGroupFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: SwitchOption[];
  layout?: "vertical" | "horizontal"; // 레이아웃 방향
  maxSelections?: number; // 최대 선택 가능한 스위치 개수
}

const SwitchGroupForm = <T extends FieldValues = FieldValues>({
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
}: SwitchGroupFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const switchGroupId = useId();

  // 개별 스위치의 상태를 변경하는 함수
  const handleSwitchChange = (key: string, checked: boolean) => {
    const currentValue = field.value || {};

    // maxSelections가 설정된 경우 체크
    if (checked && maxSelections) {
      const currentCheckedCount =
        Object.values(currentValue).filter(Boolean).length;
      if (currentCheckedCount >= maxSelections) {
        return; // 최대 선택 수에 도달했으면 더 이상 선택 불가
      }
    }

    const newValue = {
      ...currentValue,
      [key]: checked,
    };
    field.onChange(newValue);
  };

  // 현재 스위치의 상태를 가져오는 함수
  const getSwitchValue = (key: string): boolean => {
    return field.value?.[key] || false;
  };

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={switchGroupId}
    >
      <div
        className={cn(
          "gap-6",
          layout === "horizontal" ? "flex flex-wrap" : "flex flex-col"
        )}
      >
        {options.map((option) => {
          const isChecked = getSwitchValue(option.key);
          const currentValue = field.value || {};
          const currentCheckedCount =
            Object.values(currentValue).filter(Boolean).length;
          const isMaxReached = Boolean(
            maxSelections && currentCheckedCount >= maxSelections
          );
          const isDisabled = disabled || (isMaxReached && !isChecked);

          return (
            <div
              key={option.key}
              className={cn(
                "flex items-center gap-4",
                isDisabled && "opacity-50"
              )}
            >
              <label
                htmlFor={`${name}-${option.key}`}
                className="cursor-pointer text-sm leading-none font-medium"
              >
                {option.label}
              </label>
              <Switch
                id={`${name}-${option.key}`}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleSwitchChange(option.key, checked)
                }
                disabled={isDisabled}
                className={cn(error && "border-destructive")}
              />
            </div>
          );
        })}
      </div>
    </FormItem>
  );
};

export default SwitchGroupForm;
