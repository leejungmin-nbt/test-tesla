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

interface TimePickerProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

// 시간 옵션 (00 ~ 23)
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString().padStart(2, "0"),
  label: `${i}시`,
}));

// 분 옵션 (00 ~ 59)
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => ({
  value: i.toString().padStart(2, "0"),
  label: `${i}분`,
}));

const TimePicker = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  description,
  disabled = false,
  required = false,
  className,
}: TimePickerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const inputId = useId();

  // 현재 값에서 시와 분 분리
  const currentValue = field.value || "";
  const [currentHour, currentMinute] = currentValue.split(":");

  // 시 변경 핸들러
  const handleHourChange = (hour: string) => {
    const newValue = `${hour}:${currentMinute || "00"}`;
    field.onChange(newValue);
  };

  // 분 변경 핸들러
  const handleMinuteChange = (minute: string) => {
    const newValue = `${currentHour || "00"}:${minute}`;
    field.onChange(newValue);
  };

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={inputId}
    >
      <div className="flex items-center gap-2">
        <Select
          value={currentHour || ""}
          onValueChange={handleHourChange}
          disabled={disabled}
        >
          <SelectTrigger
            id={inputId}
            className={
              error
                ? `
                  border-destructive
                  focus:border-destructive
                `
                : ""
            }
          >
            <SelectValue placeholder="시" />
          </SelectTrigger>
          <SelectContent maxHeight="300px">
            {HOUR_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-muted-foreground">:</span>

        <Select
          value={currentMinute || ""}
          onValueChange={handleMinuteChange}
          disabled={disabled}
        >
          <SelectTrigger
            className={
              error
                ? `
                  border-destructive
                  focus:border-destructive
                `
                : ""
            }
          >
            <SelectValue placeholder="분" />
          </SelectTrigger>
          <SelectContent maxHeight="300px">
            {MINUTE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormItem>
  );
};

export default TimePicker;
