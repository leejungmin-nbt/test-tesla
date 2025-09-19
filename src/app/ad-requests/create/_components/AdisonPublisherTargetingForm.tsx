"use client";

import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";
import { MultiSelectForm, CheckBoxGroupForm } from "@/components/form";
import publishersData from "@/data/publishers.json";

interface AdisonPublisherTargetingFormProps {
  control: Control<AdRequestCreateFormType>;
  setValue: UseFormSetValue<AdRequestCreateFormType>;
}

const TARGETING_TYPE_OPTIONS = [
  {
    value: "ALL",
    label: "전체",
  },
  {
    value: "INCLUDE",
    label: "지정매체",
  },
  {
    value: "EXCLUDE",
    label: "제외매체",
  },
];

const INITIAL_PUBLISHER_OPTIONS = publishersData.map((media) => ({
  value: media.id.toString(),
  label: media.name,
}));

const AdisonPublisherTargetingForm: React.FC<
  AdisonPublisherTargetingFormProps
> = ({ control, setValue }) => {
  const targetingMode = useWatch({
    control,
    name: "targetAdisonPublisherIds.mode",
  });

  const onModeChangeCallback = () => {
    // mode가 변경될 때 publisherIds 초기화
    setValue("targetAdisonPublisherIds.publisherIds", []);
  };

  return (
    <div className="space-y-4">
      <CheckBoxGroupForm
        name="targetAdisonPublisherIds.mode"
        control={control}
        label="집행 매체 (애디슨)"
        options={TARGETING_TYPE_OPTIONS}
        layout="horizontal"
        maxSelections={1}
        required
        onCustomChange={onModeChangeCallback}
      />

      {targetingMode && targetingMode.includes("INCLUDE") && (
        <MultiSelectForm
          name="targetAdisonPublisherIds.publisherIds"
          control={control}
          label="지정할 매체를 선택하세요"
          placeholder="매체를 선택해주세요"
          options={INITIAL_PUBLISHER_OPTIONS}
          maxHeight="300px"
        />
      )}

      {targetingMode && targetingMode.includes("EXCLUDE") && (
        <MultiSelectForm
          name="targetAdisonPublisherIds.publisherIds"
          control={control}
          label="제외할 매체를 선택하세요"
          placeholder="매체를 선택해주세요"
          options={INITIAL_PUBLISHER_OPTIONS}
          maxHeight="300px"
        />
      )}

      {targetingMode && targetingMode.includes("ALL") && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-700">
            전체 매체에 광고가 집행됩니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdisonPublisherTargetingForm;
