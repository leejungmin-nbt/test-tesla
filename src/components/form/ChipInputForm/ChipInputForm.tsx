"use client";

import { useId, useState, KeyboardEvent } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/form/FormItem";
import { cn } from "@/utils/cn";

interface ChipInputFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  maxChips?: number;
  allowDuplicates?: boolean;
}

const ChipInputForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder = "텍스트를 입력하고 엔터를 누르세요",
  description,
  disabled = false,
  required = false,
  className,
  maxChips,
  allowDuplicates = false,
}: ChipInputFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [] as never,
  });

  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputId = useId();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      addChip();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    // 조합 완료만 처리하고, 칩 추가는 엔터 키에서만 처리
  };

  const addChip = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) return;

    // 중복 체크
    if (!allowDuplicates && field.value.includes(trimmedValue)) {
      setInputValue("");
      return;
    }

    // 최대 개수 체크
    if (maxChips && field.value.length >= maxChips) {
      setInputValue("");
      return;
    }

    const newChips = [...field.value, trimmedValue];
    field.onChange(newChips);
    setInputValue("");
  };

  const removeChip = (indexToRemove: number) => {
    const newChips = field.value.filter(
      (_: string, index: number) => index !== indexToRemove
    );
    field.onChange(newChips);
  };

  const handleClearAll = () => {
    field.onChange([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
      <div className="space-y-2">
        {/* 칩 표시 영역 */}
        {field.value.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {field.value.map((chip: string, index: number) => (
              <div
                key={`${chip}-${index}`}
                className={`
                  bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium
                `}
              >
                <span>{chip}</span>
                <button
                  type="button"
                  onClick={() => removeChip(index)}
                  disabled={disabled}
                  className={`
                    hover:bg-primary/20
                    focus:bg-primary/20 focus:outline-none
                    ml-1 rounded-full p-0.5
                    disabled:cursor-not-allowed disabled:opacity-50
                  `}
                  aria-label={`${chip} 제거`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {field.value.length > 0 && (
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
        )}
        <Input
          id={inputId}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "transition-colors",
            error &&
              `
                border-destructive
                focus-visible:ring-destructive
              `
          )}
        />
      </div>
    </FormItem>
  );
};

export default ChipInputForm;
