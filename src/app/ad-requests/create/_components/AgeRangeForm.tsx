"use client";

import { useId, useState, useCallback, useEffect } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/form/FormItem";

interface AgeRangeFormProps<T extends FieldValues = FieldValues> {
  fromName: FieldPath<T>;
  toName: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const AgeRangeForm = <T extends FieldValues = FieldValues>({
  fromName,
  toName,
  control,
  label,
  description,
  disabled = false,
  required = false,
  className,
}: AgeRangeFormProps<T>) => {
  const {
    field: fromField,
    fieldState: { error: fromError },
  } = useController({
    name: fromName,
    control,
  });

  const {
    field: toField,
    fieldState: { error: toError },
  } = useController({
    name: toName,
    control,
  });

  const fromInputId = useId();
  const toInputId = useId();
  const hasError = fromError || toError;
  const errorMessage = fromError?.message || toError?.message;

  // 현재 값들을 숫자로 변환 (기본값: 18, 65)
  const fromValue = fromField.value ? parseInt(fromField.value) : 18;
  const toValue = toField.value ? parseInt(toField.value) : 65;

  // Slider 드래그 중 로컬 상태
  const [localSliderValues, setLocalSliderValues] = useState<number[]>([
    fromValue,
    toValue,
  ]);

  // Slider 값 변경 핸들러 (드래그 중)
  const handleSliderChange = useCallback((values: number[]) => {
    setLocalSliderValues(values);
  }, []);

  // Slider 드래그 완료 핸들러
  const handleSliderCommit = useCallback(
    (values: number[]) => {
      fromField.onChange(values[0].toString());
      toField.onChange(values[1].toString());
    },
    [fromField, toField]
  );

  // 폼 값이 변경될 때 로컬 상태 동기화
  useEffect(() => {
    setLocalSliderValues([fromValue, toValue]);
  }, [fromValue, toValue]);

  // Input 값 변경 핸들러
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      fromField.onChange(numValue.toString());
      setLocalSliderValues([numValue, localSliderValues[1]]);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      toField.onChange(numValue.toString());
      setLocalSliderValues([localSliderValues[0], numValue]);
    }
  };

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={errorMessage}
      className={className}
      inputId={fromInputId}
    >
      <div className="space-y-4">
        {/* 입력 필드 */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              id={fromInputId}
              //   type="number"
              placeholder="최소 나이"
              value={fromField.value || ""}
              onChange={handleFromChange}
              onBlur={fromField.onBlur}
              disabled={disabled}
              min={0}
              max={100}
              className={
                hasError
                  ? `
                    border-destructive
                    focus-visible:border-destructive
                  `
                  : ""
              }
            />
          </div>
          <span className="text-muted-foreground text-sm font-medium">~</span>
          <div className="flex-1">
            <Input
              id={toInputId}
              //   type="number"
              placeholder="최대 나이"
              value={toField.value || ""}
              onChange={handleToChange}
              onBlur={toField.onBlur}
              disabled={disabled}
              min={0}
              max={100}
              className={
                hasError
                  ? `
                    border-destructive
                    focus-visible:border-destructive
                  `
                  : ""
              }
            />
          </div>
        </div>

        {/* Slider */}
        <div className="px-2">
          <Slider
            value={localSliderValues}
            onValueChange={handleSliderChange}
            onValueCommit={handleSliderCommit}
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            className="w-full"
          />
          <div className="text-muted-foreground mt-1 flex justify-between text-xs">
            <span>0세</span>
            <span>100세</span>
          </div>
        </div>
      </div>
    </FormItem>
  );
};

export default AgeRangeForm;
