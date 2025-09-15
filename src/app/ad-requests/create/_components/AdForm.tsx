"use client";

import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import {
  TextInput,
  TextAreaForm,
  SelectForm,
  CheckBoxGroupForm,
  FormSection,
  CalendarForm,
  CardSelectForm,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";
import adTypesData from "@/data/adTypes.json";
import adSettleTypesData from "@/data/adSettleTypes.json";
import TimeRangeForm from "./TimeRangeForm";
import AgeRangeForm from "./AgeRangeForm";
import AdisonPublisherTargetingForm from "./AdisonPublisherTargetingForm";
// Mock 데이터
const MOCK_STEP2_DATA = {
  targetCookieovenPublisherIds: ["1", "2"], // 웹툰, 시리즈 모두 선택
  adActionTypeId: "1",
  targetOs: ["Android", "iOS"],
  adTypeId: "1",
  startAt: "2025-09-29T18:03:00.000Z",
  endAt: "2025-10-05T18:00:00.000Z",
  targetTimes: { from: "09:00", to: "18:00" },
  landingUrl: {
    default: "https://www.example.com/landing",
    android: "https://www.example.com/landing/android",
    ios: "https://www.example.com/landing/ios",
  },
  viewAssets: {
    thumbnailFeed:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
    thumbnailIcon:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100",
    title: "특별한 혜택을 놓치지 마세요!",
    subtitle: "지금 바로 시작하는 특별한 광고 캠페인",
    detailImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    navigationTitle: "광고 상세 정보",
    detailTitle: "더 자세한 정보가 궁금하다면?",
    detailSubtitle: "이벤트 참여 방법과 혜택을 확인해보세요",
    callToAction: "지금 바로 참여하기",
    notice:
      "이벤트 참여 시 개인정보가 수집될 수 있습니다. 참여 전 이용약관을 확인해주세요.",
  },
  adSettleTypeId: "1",
  cost: "5000",
  minPaymentAmount: "10000",
  budget: "5000000",
  dailyActionCap: "5000",
  delayTerm: "7",
  participateExpiredAt: "30",
  targetGenders: ["Male", "Female"],
  targetAges: { from: "20", to: "40" },
  targetAdisonPublisherIds: {
    mode: ["INCLUDE"],
    publisherIds: ["1", "2", "3"],
  },
};

interface AdFormProps {
  control: Control<AdRequestCreateFormType>;
  setValue: UseFormSetValue<AdRequestCreateFormType>;
}

const TARGET_PUBLISHER_TYPE_OPTIONS = [
  {
    value: "1",
    label: "WEBTOON",
  },
  {
    value: "2",
    label: "SERIES",
  },
];

const AD_ACTION_TYPE_OPTIONS = [
  {
    value: "1",
    label: "WEB",
  },
  {
    value: "2",
    label: "APP",
  },
];

const TARGET_OS_OPTIONS = [
  {
    value: "Android",
    label: "Android",
    icon: (
      <svg
        className="h-6 w-6 text-green-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.6808 12 7.6808s-3.5902.5631-5.1367 1.7279L4.841 5.9047a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
      </svg>
    ),
  },
  {
    value: "iOS",
    label: "iOS",
    icon: (
      <svg
        className="h-6 w-6 text-black"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
];

const AD_TYPE_OPTIONS = adTypesData.map((adType) => ({
  value: adType.id.toString(),
  label: adType.name,
}));

const AD_SETTLE_TYPE_OPTIONS = adSettleTypesData.map((adSettleType) => ({
  value: adSettleType.id.toString(),
  label: adSettleType.name,
}));

const TARGET_GENDERS_OPTIONS = [
  {
    value: "Male",
    label: "남성",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7" r="3" />
        <path d="M12 11c-3.5 0-6 2.5-6 5v1c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1c0-2.5-2.5-5-6-5z" />
      </svg>
    ),
  },
  {
    value: "Female",
    label: "여성",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="9" cy="7" r="3" />
        <path d="M9 11c-3.5 0-6 2.5-6 5v1c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1c0-2.5-2.5-5-6-5z" />
        <circle cx="15" cy="6" r="2.5" />
        <path d="M15 9.5c-2.8 0-4.5 2-4.5 4v.5c0 .8.7 1.5 1.5 1.5h6c.8 0 1.5-.7 1.5-1.5v-.5c0-2-1.7-4-4.5-4z" />
      </svg>
    ),
  },
  {
    value: "Etc",
    label: "기타",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="10" cy="7" r="3" />
        <path d="M10 11c-3.5 0-6 2.5-6 5v1c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1c0-2.5-2.5-5-6-5z" />
        <circle cx="19" cy="5" r="4" fill="currentColor" />
        <path
          d="M17 5l1.5 1.5L21 4"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const AdForm: React.FC<AdFormProps> = ({ control, setValue }) => {
  const targetCookieovenPublisherIds = useWatch({
    control,
    name: "targetCookieovenPublisherIds",
  });

  const campaignTitle = useWatch({
    control,
    name: "title",
  });

  const addMockStep2Data = () => {
    Object.entries(MOCK_STEP2_DATA).forEach(([key, value]) => {
      setValue(key as keyof AdRequestCreateFormType, value as never, {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{campaignTitle}</h2>

      <FormSection
        title="광고 매체"
        description="광고가 등록되는 매체에 대한 정보를 입력해주세요."
      >
        <CheckBoxGroupForm
          name="targetCookieovenPublisherIds"
          control={control}
          label="집행 매체 (쿠키오븐)"
          options={TARGET_PUBLISHER_TYPE_OPTIONS}
          layout="horizontal"
          required
        />
        <div>
          {targetCookieovenPublisherIds.length > 0 && (
            <div
              className={`
                rounded-md p-3
                ${
                  targetCookieovenPublisherIds.length === 1
                    ? targetCookieovenPublisherIds[0] === "1"
                      ? "bg-[#03C75A] text-white" // 웹툰 매체
                      : "bg-black text-white" // 시리즈 매체
                    : "border border-blue-200 bg-blue-50" // 전체 매체
                }
              `}
            >
              <p
                className={`
                  text-sm font-medium
                  ${
                    targetCookieovenPublisherIds.length === 1
                      ? "text-white"
                      : "text-blue-700"
                  }
                `}
              >
                {targetCookieovenPublisherIds.length === 1
                  ? targetCookieovenPublisherIds[0] === "1"
                    ? "웹툰 매체에 광고가 집행됩니다."
                    : "시리즈 매체에 광고가 집행됩니다."
                  : "전체 매체에 광고가 집행됩니다."}
              </p>
            </div>
          )}
        </div>

        {/* 애디슨 광고 집행 매체 관련 폼 */}
        <AdisonPublisherTargetingForm control={control} setValue={setValue} />
        <CardSelectForm
          name="targetOs"
          control={control}
          label="집행 매체 OS"
          options={TARGET_OS_OPTIONS}
          layout="horizontal"
          required
        />
        <SelectForm
          name="adActionTypeId"
          control={control}
          label="광고 액션 타입"
          options={AD_ACTION_TYPE_OPTIONS}
          required
        />
      </FormSection>
      <FormSection
        title="타이틀 입니다. 변경이 필요해요."
        description="설명 입니다. 변경이 필요해요."
      >
        <SelectForm
          name="adTypeId"
          control={control}
          label="광고 타입"
          options={AD_TYPE_OPTIONS}
          maxHeight="300px"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <CalendarForm
            name="startAt"
            control={control}
            label="광고 시작 시간"
            includeTime={true}
            start={true}
            required
          />
          <CalendarForm
            name="endAt"
            control={control}
            label="광고 종료 시간"
            includeTime={true}
            end={true}
            required
          />
        </div>
        <TimeRangeForm
          fromName="targetTimes.from"
          toName="targetTimes.to"
          control={control}
          description="광고가 노출될 시간 범위를 설정해주세요 (24시간제)"
        />
      </FormSection>
      <FormSection
        title="광고 랜딩 URL"
        description="랜딩/트래킹 주소, OS별 분기 처리가 필요합니다."
      >
        <TextInput
          name="landingUrl.default"
          control={control}
          label="기본 랜딩 페이지 URL"
          placeholder="https://example.com"
        />
        <TextInput
          name="landingUrl.android"
          control={control}
          label="Android 랜딩 페이지 URL"
          placeholder="https://example.com"
        />
        <TextInput
          name="landingUrl.ios"
          control={control}
          label="iOS 랜딩 페이지 URL"
          placeholder="https://example.com"
        />
      </FormSection>
      <FormSection
        title="광고 에셋"
        description="유저에게 노출되는 광고 에셋에 대한 정보를 입력해주세요."
      >
        {/* 파일 업로드 필요 */}
        <TextInput
          name="viewAssets.thumbnailFeed"
          control={control}
          label="피드 썸네일"
          placeholder="https://example.com"
          required
        />
        {/* 파일 업로드 필요 */}
        <TextInput
          name="viewAssets.thumbnailIcon"
          control={control}
          label="아이콘 썸네일"
          placeholder="https://example.com"
          required
        />
        <TextInput
          name="viewAssets.title"
          control={control}
          label="타이틀"
          placeholder="타이틀"
          required
        />
        <TextInput
          name="viewAssets.subtitle"
          control={control}
          label="서브 타이틀"
          placeholder="서브 타이틀"
          required
        />
        {/* 파일 업로드 필요 */}
        <TextInput
          name="viewAssets.detailImage"
          control={control}
          label="광고 상세 이미지"
          placeholder="https://example.com"
          required
        />
        <TextInput
          name="viewAssets.navigationTitle"
          control={control}
          label="상세 타이틀바"
          placeholder="상세 타이틀바"
          required
        />
        <TextInput
          name="viewAssets.detailTitle"
          control={control}
          label="상세 타이틀"
          placeholder="상세 타이틀"
          required
        />
        <TextInput
          name="viewAssets.detailSubtitle"
          control={control}
          label="상세 서브 타이틀"
          placeholder="상세 서브 타이틀"
        />
        <TextInput
          name="viewAssets.callToAction"
          control={control}
          label="액션 버튼 문구"
          placeholder="액션 버튼 문구"
        />
        <TextAreaForm
          name="viewAssets.notice"
          control={control}
          label="이벤트에 관련하여 안내할 내용"
          placeholder="이벤트에 관련하여 안내할 내용"
          required
        />
      </FormSection>
      <FormSection
        title="광고 정산 및 단가"
        description="광고 정산 및 단가에 대한 정보를 입력해주세요."
      >
        <SelectForm
          name="adSettleTypeId"
          control={control}
          label="광고 정산 타입"
          options={AD_SETTLE_TYPE_OPTIONS}
          maxHeight="300px"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name="cost"
            control={control}
            label="단가(원)"
            placeholder="단가(원)"
            required
          />
          <TextInput
            name="minPaymentAmount"
            control={control}
            label="최소 결제 금액(원)"
            placeholder="최소 결제 금액(원)"
          />
          <TextInput
            name="budget"
            control={control}
            label="예산(원)"
            placeholder="예산(원)"
            required
          />
          <TextInput
            name="dailyActionCap"
            control={control}
            label="일일 물량 자동 설정 값"
            placeholder="일일 물량 자동 설정 값"
            required
          />
          <TextInput
            name="delayTerm"
            control={control}
            label="후지급 시간"
            placeholder="후지급 시간"
          />
          <TextInput
            name="participateExpiredAt"
            control={control}
            label="완료 인정 유효기간(일단위)"
            placeholder="완료 인정 유효기간(일단위)"
            required
          />
        </div>
      </FormSection>
      <FormSection
        title="광고 타켓팅 관리"
        description="광고 타켓팅에 대한 정보를 입력해주세요."
      >
        <CardSelectForm
          name="targetGenders"
          control={control}
          label="대상 성별"
          options={TARGET_GENDERS_OPTIONS}
          layout="horizontal"
        />
        <AgeRangeForm
          fromName="targetAges.from"
          toName="targetAges.to"
          control={control}
          label="대상 나이 범위"
          description="광고를 노출할 대상의 나이 범위를 설정해주세요"
        />
      </FormSection>

      {/* 테스트 데이터 추가 버튼 */}
      <div className="mt-6 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={addMockStep2Data}
          className="w-full"
        >
          테스트 데이터 추가
        </Button>
      </div>
    </div>
  );
};

export default AdForm;
