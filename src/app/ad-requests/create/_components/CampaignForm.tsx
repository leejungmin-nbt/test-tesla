"use client";

import { Control, UseFormSetValue } from "react-hook-form";
import {
  TextInput,
  SelectForm,
  MultiSelectForm,
  FormSection,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";
import categoriesData from "@/data/categories.json";
import advertisersData from "@/data/advertisers.json";
import advertiserIntegrationsData from "@/data/advertiserIntegrations.json";
import helpRequestPersonalInfoTypesData from "@/data/helpRequestPersonalInfoTypes.json";
import repeatParticipateTypesData from "@/data/repeatParticipateTypes.json";
import { AD_REQUEST_REPORT_TYPE } from "@/constants/adRequest";
import { MOCK_STEP1_DATA } from "@/data/mockDatas";

// repeatParticipateTypes.json 데이터를 기반으로 REPEAT_PARTICIPATE_TYPE_OPTIONS 생성
const REPEAT_PARTICIPATE_TYPE_OPTIONS = repeatParticipateTypesData.map(
  (repeatParticipateType) => ({
    value: repeatParticipateType.id.toString(),
    label: repeatParticipateType.name,
  })
);

// advertisers.json 데�터를 기반으로 ADVERTISER_OPTIONS 생성
const ADVERTISER_OPTIONS = advertisersData.map((advertiser) => ({
  value: advertiser.id.toString(),
  label: advertiser.name,
}));

// advertiserIntegrations.json 데이터를 기반으로 ADVERTISER_INTEGRATION_OPTIONS 생성
const ADVERTISER_INTEGRATION_OPTIONS = advertiserIntegrationsData.map(
  (advertiserIntegration) => ({
    value: advertiserIntegration.id.toString(),
    label: advertiserIntegration.name,
  })
);

// categories.json 데이터를 기반으로 CATEGORY_OPTIONS 생성
const CATEGORY_OPTIONS = categoriesData.map((category) => ({
  value: category.id.toString(),
  label: category.name,
}));

// helpRequestPersonalInfoTypes.json 데이터를 기반으로 HELP_REQUEST_PERSONAL_INFO_TYPE_OPTIONS 생성
const HELP_REQUEST_PERSONAL_INFO_TYPE_OPTIONS =
  helpRequestPersonalInfoTypesData.map((helpRequestPersonalInfoType) => ({
    value: helpRequestPersonalInfoType.id.toString(),
    label: helpRequestPersonalInfoType.name,
  }));

interface CampaignFormProps {
  control: Control<AdRequestCreateFormType>;
  setValue: UseFormSetValue<AdRequestCreateFormType>;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ control, setValue }) => {
  const addMockStep1Data = () => {
    Object.entries(MOCK_STEP1_DATA).forEach(([key, value]) => {
      setValue(key as keyof AdRequestCreateFormType, value as never, {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">캠페인 정보</h2>
      <TextInput
        name="title"
        control={control}
        label="캠페인 제목"
        placeholder="캠페인 제목을 입력하세요."
        required
      />
      <FormSection
        title="타이틀 입니다. 변경이 필요해요."
        description="설명 입니다. 변경이 필요해요."
      >
        <div className="grid grid-cols-2 gap-4">
          <SelectForm
            name="advertiserId"
            control={control}
            label="광고주"
            placeholder="광고주를 선택하세요."
            options={ADVERTISER_OPTIONS}
            maxHeight="300px"
            required
          />

          <TextInput
            name="brand"
            control={control}
            label="브랜드명"
            placeholder="브랜드명을 입력하세요."
            required
          />

          <TextInput
            name="adVendor"
            control={control}
            label="거래처"
            placeholder="거래처를 입력하세요."
            required
          />

          <SelectForm
            name="categoryId"
            control={control}
            label="카테고리"
            placeholder="카테고리를 선택하세요."
            options={CATEGORY_OPTIONS}
            maxHeight="300px"
            required
          />
        </div>
      </FormSection>
      <SelectForm
        name="advertiserIntegrationId"
        control={control}
        label="적립 허용 광고주 연동"
        placeholder="적립 허용할 광고주 연동을 선택하세요."
        options={ADVERTISER_INTEGRATION_OPTIONS}
        maxHeight="300px"
        required
        description={
          <div>
            <p>
              미리 연동한 광고주 서버로부터 적립 요청이 왔을 때 해당 광고주의
              토큰이 검증되었을 때만 적립을 허용하는 기능입니다.
            </p>
            <p>S2S 연동하는 캠페인의 경우 필수로 설정하셔야합니다.</p>
          </div>
        }
      />
      <SelectForm
        name="reportType"
        control={control}
        label="리포트 타입"
        placeholder="리포트 타입을 선택하세요."
        options={AD_REQUEST_REPORT_TYPE.map((reportType) => ({
          value: reportType.id.toString(),
          label: reportType.name,
        }))}
        required
      />
      <SelectForm
        name="repeatParticipateTypeId"
        control={control}
        label="재참여 타입"
        placeholder="재참여 타입을 선택하세요."
        options={REPEAT_PARTICIPATE_TYPE_OPTIONS}
        required
      />
      <FormSection
        title="캠페인 부가정보 설정"
        description="캠페인의 부가정보를 설정하세요."
      >
        <MultiSelectForm
          name="helpRequestPersonalInfoTypeIds"
          control={control}
          label="개인정보 수집 항목"
          placeholder="개인정보 수집 항목을 선택하세요."
          options={HELP_REQUEST_PERSONAL_INFO_TYPE_OPTIONS}
          maxHeight="300px"
          required
        />
        <div className="space-y-4">
          <TextInput
            name="advertiserCsManagerNames"
            control={control}
            label="광고주 담당자"
            placeholder="담당자 이름을 입력하세요."
          />
          <TextInput
            name="advertiserCsManagerEmails"
            control={control}
            label="광고주 담당자 이메일"
            placeholder="담당자 이메일을 입력하세요."
            required
          />
        </div>
      </FormSection>
      {/* 테스트 데이터 추가 버튼 */}
      <div className="mt-6 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={addMockStep1Data}
          className="w-full"
        >
          테스트 데이터 추가
        </Button>
      </div>
    </div>
  );
};

export default CampaignForm;
