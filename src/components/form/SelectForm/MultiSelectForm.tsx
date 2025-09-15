"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormItem } from "@/components/form/FormItem";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  options: MultiSelectOption[];
  maxSelections?: number;
  maxHeight?: string | number;
}

const MultiSelectForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder = "선택해주세요",
  description,
  disabled = false,
  required = false,
  className,
  options,
  maxSelections,
  maxHeight,
}: MultiSelectFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const selectId = useId();
  const selectedValues: string[] = field.value || [];

  // 선택 가능한 옵션들 (이미 선택된 것들 제외)
  const availableOptions = options.filter(
    (option) => !selectedValues.includes(option.value)
  );

  // 새로운 값 선택 처리
  const handleSelect = (value: string) => {
    if (!selectedValues.includes(value)) {
      const newValues = [...selectedValues, value];
      field.onChange(newValues);
    }
  };

  // 선택된 값 제거 처리
  const handleRemove = (valueToRemove: string) => {
    const newValues = selectedValues.filter((value) => value !== valueToRemove);
    field.onChange(newValues);
  };

  // 모든 선택 제거
  const handleClearAll = () => {
    field.onChange([]);
  };

  // 최대 선택 개수에 도달했는지 확인
  const isMaxSelectionReached = maxSelections
    ? selectedValues.length >= maxSelections
    : false;

  // 선택된 값들을 표시하는 컴포넌트
  const renderSelectedChips = () => {
    if (selectedValues.length === 0) return null;

    return (
      <div className="mb-2 flex flex-wrap gap-2">
        {selectedValues.map((value) => {
          const option = options.find((opt) => opt.value === value);
          if (!option) return null;

          return (
            <div
              key={value}
              className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium"
            >
              <span>{option.label}</span>
              <button
                type="button"
                onClick={() => handleRemove(value)}
                disabled={disabled}
                className={`
                  hover:bg-primary/20
                  focus:bg-primary/20 focus:outline-none
                  ml-1 rounded-full p-0.5
                  disabled:cursor-not-allowed disabled:opacity-50
                `}
                aria-label={`${option.label} 제거`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
        {selectedValues.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            disabled={disabled}
            className={`
              text-muted-foreground text-xs underline
              hover:text-foreground
              focus:outline-none
              disabled:cursor-not-allowed disabled:opacity-50
            `}
          >
            모두 제거
          </button>
        )}
      </div>
    );
  };

  // placeholder 텍스트 결정
  const getPlaceholderText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }

    if (isMaxSelectionReached) {
      return `최대 ${maxSelections}개까지 선택 가능`;
    }

    if (availableOptions.length === 0) {
      return "선택 가능한 항목이 없습니다";
    }

    return "추가 선택";
  };

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={selectId}
    >
      <div className="space-y-2">
        {renderSelectedChips()}

        <Select
          disabled={
            disabled || isMaxSelectionReached || availableOptions.length === 0
          }
          onValueChange={handleSelect}
          value="" // 항상 빈 값으로 유지 (선택 후 즉시 리셋)
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
            <SelectValue placeholder={getPlaceholderText()} />
          </SelectTrigger>
          <SelectContent maxHeight={maxHeight}>
            {availableOptions.length === 0 ? (
              <div className="text-muted-foreground p-2 text-center text-sm">
                {isMaxSelectionReached
                  ? `최대 ${maxSelections}개까지만 선택할 수 있습니다`
                  : "선택 가능한 항목이 없습니다"}
              </div>
            ) : (
              availableOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {maxSelections && (
          <div className="text-muted-foreground text-xs">
            {selectedValues.length}/{maxSelections}개 선택됨
          </div>
        )}
      </div>
    </FormItem>
  );
};

export default MultiSelectForm;
