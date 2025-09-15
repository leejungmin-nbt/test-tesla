"use client";

import { useId } from "react";
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ReactNode } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormItem } from "@/components/form/FormItem";

// 타입 가드 함수들
const isDate = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

const isISOString = (value: unknown): value is string => {
  return typeof value === "string" && !isNaN(Date.parse(value));
};

// 값을 Date 객체로 변환하는 헬퍼 함수
const parseValue = (value: unknown): Date | undefined => {
  if (isDate(value)) return value;
  if (isISOString(value)) return new Date(value);
  return undefined;
};

interface CalendarFormProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  dateFormat?: string; // 날짜 표시 형식 (기본: "PPP")
  includeTime?: boolean; // 시간 선택 포함 여부 (기본: false)
  start?: boolean; // 시작 시간 모드 (00:00:00)
  end?: boolean; // 종료 시간 모드 (23:59:59)
}

const CalendarForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  description,
  disabled = false,
  required = false,
  className,
  dateFormat = "PPP", // 2024년 1월 1일 (월) 형식
  includeTime = false, // 기본값: 날짜만 선택
  start = false,
  end = false,
}: CalendarFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const calendarId = useId();

  // 기본 placeholder 설정
  const defaultPlaceholder = includeTime
    ? "날짜와 시간을 선택해주세요"
    : "날짜를 선택해주세요";
  const finalPlaceholder = placeholder || defaultPlaceholder;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      field.onChange(undefined);
      return;
    }

    if (includeTime) {
      // 기존 시간 정보가 있으면 유지, 없으면 현재 시간으로 설정
      const currentValue = parseValue(field.value);

      if (currentValue) {
        const newDate = new Date(date);
        newDate.setHours(currentValue.getHours());
        newDate.setMinutes(currentValue.getMinutes());
        // 날짜를 ISO 문자열로 변환해서 저장

        field.onChange(newDate.toISOString());
      } else {
        // start/end props에 따라 시간 설정
        if (start) {
          date.setHours(0, 0, 0, 0);
        } else if (end) {
          date.setHours(23, 59, 59, 999);
        } else {
          // 새로운 날짜에 현재 시간 설정
          const now = new Date();
          date.setHours(now.getHours());
          date.setMinutes(now.getMinutes());
        }
        // 날짜를 ISO 문자열로 변환해서 저장
        field.onChange(date.toISOString());
      }
    } else {
      // start/end props에 따라 시간 설정
      if (start) {
        date.setHours(0, 0, 0, 0);
      } else if (end) {
        date.setHours(23, 59, 59, 999);
      }
      // 날짜를 ISO 문자열로 변환해서 저장
      field.onChange(date.toISOString());
    }
  };

  const handleTimeChange = (timeString: string) => {
    if (!includeTime) return;

    const currentDate = parseValue(field.value) || new Date();

    // 시간 문자열 파싱 (HH:mm 형식)
    const [hours, minutes] = timeString.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) return;
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return;

    const newDate = new Date(currentDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    // 날짜를 ISO 문자열로 변환해서 저장
    field.onChange(newDate.toISOString());
  };

  const getTimeString = () => {
    if (!includeTime) return "";

    const dateValue = parseValue(field.value);
    if (!dateValue) return "";

    const hours = dateValue.getHours();
    const minutes = dateValue.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const getDisplayValue = () => {
    const dateValue = parseValue(field.value);
    if (!dateValue) return null;

    const dateStr = format(dateValue, dateFormat, { locale: ko });

    if (includeTime) {
      const timeStr = getTimeString();
      return `${dateStr} ${timeStr}`;
    } else {
      return dateStr;
    }
  };

  return (
    <FormItem
      label={label}
      required={required}
      description={description}
      errorMessage={error?.message}
      className={className}
      inputId={calendarId}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={calendarId}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !field.value && "text-muted-foreground",
              error &&
                `
                  border-destructive
                  focus-visible:border-destructive
                `
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? getDisplayValue() : <span>{finalPlaceholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className={includeTime ? "space-y-3 p-3" : ""}>
            <Calendar
              mode="single"
              selected={parseValue(field.value)}
              onSelect={handleDateSelect}
              disabled={disabled}
              initialFocus
            />
            {includeTime && (
              <div className="border-t pt-3">
                <label className="mb-2 block text-sm font-medium">
                  시간 선택
                </label>
                <Input
                  type="time"
                  value={getTimeString() || ""}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  disabled={disabled}
                  className={cn(
                    error &&
                      `
                        border-destructive
                        focus-visible:border-destructive
                      `
                  )}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
};

export default CalendarForm;
