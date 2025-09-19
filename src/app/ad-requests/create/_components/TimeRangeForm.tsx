"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import TimePicker from "./TimePicker";

interface TimeRangeFormProps<T extends FieldValues = FieldValues> {
  fromName: FieldPath<T>;
  toName: FieldPath<T>;
  control: Control<T>;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const TimeRangeForm = <T extends FieldValues = FieldValues>({
  fromName,
  toName,
  control,
  description,
  disabled = false,
  required = false,
  className,
}: TimeRangeFormProps<T>) => {
  return (
    <div className={className}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <TimePicker
            name={fromName}
            control={control}
            label="노출 시작 시간"
            disabled={disabled}
            required={required}
          />
        </div>
        <span className="text-muted-foreground mt-6 text-sm font-medium">
          ~
        </span>
        <div className="flex-1">
          <TimePicker
            name={toName}
            control={control}
            label="노출 종료 시간"
            disabled={disabled}
            required={required}
          />
        </div>
      </div>
      {description && (
        <div className="text-muted-foreground mt-2 text-sm">{description}</div>
      )}
    </div>
  );
};

export default TimeRangeForm;
