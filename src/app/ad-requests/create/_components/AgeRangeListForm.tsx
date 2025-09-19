"use client";

import { Control, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users } from "lucide-react";
import AgeRangeForm from "./AgeRangeForm";
import { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";

interface AgeRangeListFormProps {
  control: Control<AdRequestCreateFormType>;
  name: "targetAges";
  label?: string;
  description?: string;
  required?: boolean;
}

const AgeRangeListForm: React.FC<AgeRangeListFormProps> = ({
  control,
  name,
  label = "나이 범위 설정",
  description = "광고를 노출할 대상의 나이 범위를 설정해주세요",
  required,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const watchedFields = useWatch({
    control,
    name,
  });

  const addAgeRange = () => {
    append({ from: "", to: "" });
  };

  const removeAgeRange = (index: number) => {
    remove(index);
  };

  const formatAge = (age: string) => {
    if (!age) {
      return "";
    }

    return age;
  };

  const getAgeRangeDisplay = (from: string, to: string) => {
    if (!from || !to) {
      return "나이 미설정";
    }
    return `${formatAge(from)}세 ~ ${formatAge(to)}세`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label
            className={`
              text-sm leading-none font-medium
              peer-disabled:cursor-not-allowed peer-disabled:opacity-70
            `}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addAgeRange}
          disabled={fields.length >= 10}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          나이 범위 추가
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <Card key={field.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Users className="h-4 w-4" />
                  나이 범위 {index + 1}
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAgeRange(index)}
                  className={`
                    h-8 w-8 p-0 text-red-500
                    hover:bg-red-50 hover:text-red-700
                  `}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {watchedFields?.[index] && (
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {getAgeRangeDisplay(
                      watchedFields[index]?.from || "",
                      watchedFields[index]?.to || ""
                    )}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <AgeRangeForm
                fromName={
                  `${name}.${index}.from` as keyof AdRequestCreateFormType
                }
                toName={`${name}.${index}.to` as keyof AdRequestCreateFormType}
                control={control}
                required={required}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="text-muted-foreground py-8 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 opacity-50" />
          <p className="text-sm">아직 설정된 나이 범위가 없습니다.</p>
          <p className="mt-1 text-xs">
            위의 &quot;나이 범위 추가&quot; 버튼을 클릭하여 나이 범위를
            설정해주세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default AgeRangeListForm;
