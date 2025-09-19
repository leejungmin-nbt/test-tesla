import z from "zod";

//step1 캠페인 정보
export const adRequestStep1CampaignInfoSchema = z.object({
  title: z.string().min(1, "캠페인 제목을 입력해주세요"),
  advertiserId: z.string().min(1, "광고주를 선택해주세요."), // number
  brand: z.string().min(1, "브랜드명을 입력해주세요"),
  adVendor: z.string().min(1, "거래처를 입력해주세요"),
  categoryId: z.string().min(1, "카테고리를 선택해주세요."), // number
  advertiserIntegrationId: z.string().min(1, "토큰값을 선택해주세요."), // number
  reportType: z.string().min(1, "리포트 타입을 선택해주세요."), // number
  repeatParticipateTypeId: z.string().min(1, "재참여 타입을 선택해주세요."), // number
  helpRequestPersonalInfoTypeIds: z
    .array(z.string())
    .min(1, "개인정보 수집 항목을 선택해주세요."), // number
  advertiserCsManagerNames: z.string(),
  advertiserCsManagerEmails: z.string().min(1, "이메일을 입력해주세요."),
});

//step2 광고 정보
export const adRequestStep2AdInfoSchema = z.object({
  targetCookieovenPublisherIds: z
    .array(z.string())
    .min(1, "1개 이상의 집행 매체를 선택해주세요."), // number
  adActionTypeId: z.string().min(1, "광고 액션 타입을 선택해주세요."), // number
  targetOs: z
    .array(z.string())
    .min(1, "1개 이상의 집행 매체 OS를 선택해주세요."), // number

  adTypeId: z.string().min(1, "광고 타입을 선택해주세요."), // number
  startAt: z.string().min(1, "광고 시작 시간을 선택해주세요."),
  endAt: z.string().min(1, "광고 종료 시간을 선택해주세요."),
  targetTimes: z.array(
    z.object({
      from: z.string().min(1, "시작 시간을 선택해주세요."),
      to: z.string().min(1, "종료 시간을 선택해주세요."),
    })
  ),

  landingUrl: z.object({
    default: z
      .string()
      .refine(
        (val) => val === "" || /^https?:\/\/.+/.test(val),
        "올바른 url을 입력해주세요."
      ),
    android: z
      .string()
      .refine(
        (val) => val === "" || /^https?:\/\/.+/.test(val),
        "올바른 url을 입력해주세요."
      ),
    ios: z
      .string()
      .refine(
        (val) => val === "" || /^https?:\/\/.+/.test(val),
        "올바른 url을 입력해주세요."
      ),
  }),

  viewAssets: z.object({
    thumbnailFeed: z.url("올바른 url을 입력해주세요."),
    thumbnailIcon: z.url("올바른 url을 입력해주세요."),
    title: z.string().min(1, "제목을 입력해주세요."),
    subtitle: z.string().min(1, "부제목을 입력해주세요."),

    detailImage: z.url("올바른 url을 입력해주세요."),
    navigationTitle: z.string().min(1, "상세 타이틀바를 입력해주세요."),
    detailTitle: z.string().min(1, "상세 타이틀을 입력해주세요."),
    detailSubtitle: z.string(), // 선택값

    callToAction: z.string(), // 선택값
    notice: z.string().min(1, "이벤트에 관련하여 안내할 내용을 입력해주세요."),
  }),

  adSettleTypeId: z.string().min(1, "광고 정산 타입을 선택해주세요."), // number
  cost: z.string().min(1, "단가를 입력해주세요."), // number
  minPaymentAmount: z.string(), // number
  budget: z.string().min(1, "예산을 입력해주세요."), // number
  dailyActionCap: z.string().min(1, "일일 물량 자동 설정 값을 입력해주세요."), // number
  delayTerm: z.string(), // number
  participateExpiredAt: z
    .string()
    .min(1, "광고 참여 후 완료 인정 유호기간(일단위)을 입력해주세요."), // number

  targetGenders: z.array(z.string()).optional().nullable(),
  targetAges: z.array(
    z.object({
      from: z.string().min(1, "시작 나이를 입력해주세요."),
      to: z.string().min(1, "종료 나이를 입력해주세요."),
    })
  ),
  targetOther: z.string(),
  targetAdisonPublisherIds: z
    .object({
      mode: z
        .array(z.enum(["ALL", "INCLUDE", "EXCLUDE"]))
        .min(1, "애디슨 매체 집행 방식을 선택해주세요."),
      publisherIds: z.array(z.string()), // number
    })
    .refine(
      (data) => {
        // mode가 INCLUDE 또는 EXCLUDE인 경우 publisherIds가 1개 이상 있어야 함
        if (data.mode.includes("INCLUDE") || data.mode.includes("EXCLUDE")) {
          return data.publisherIds.length > 0;
        }
        return true;
      },
      {
        message: "지정 또는 제외할 매체를 1개 이상 선택해주세요.",
        path: ["publisherIds"],
      }
    ),
});

export type AdRequestStep1CampaignInfoType = z.infer<
  typeof adRequestStep1CampaignInfoSchema
>;

export type AdRequestStep2AdInfoType = z.infer<
  typeof adRequestStep2AdInfoSchema
>;

// adRequestCreate 폼 스키마 (두 스키마 병합)
export const adRequestCreateFormSchema = adRequestStep1CampaignInfoSchema.and(
  adRequestStep2AdInfoSchema
);

export type AdRequestCreateFormType = z.infer<typeof adRequestCreateFormSchema>;
