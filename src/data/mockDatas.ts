export const MOCK_STEP1_DATA = {
  title: "신제품 런칭 광고",
  advertiserId: "1",
  brand: "테크스타트업",
  adVendor: "테크스타트업",
  categoryId: "1",
  advertiserIntegrationId: "3",
  reportType: "1",
  repeatParticipateTypeId: "1",
  helpRequestPersonalInfoTypeIds: [
    "1",
    "2",
    "3",
    "4",
    "6",
    "7",
    "8",
    "9",
    "10",
  ],
  advertiserCsManagerNames: "이정민담당자",
  advertiserCsManagerEmails: "marketing@techstartup.com",
};

export const MOCK_STEP2_DATA = {
  targetCookieovenPublisherIds: ["1", "2"], // 웹툰, 시리즈 모두 선택
  adActionTypeId: "1",
  targetOs: ["1", "2"],
  adTypeId: "1",
  startAt: "2025-09-29T18:03:00.000Z",
  endAt: "2025-10-05T18:00:00.000Z",
  targetTimes: [
    { from: "09:00", to: "12:00" },
    { from: "14:00", to: "18:00" },
    { from: "20:00", to: "22:00" },
  ],
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
  targetGenders: ["man", "woman"],
  targetAges: [
    { from: "20", to: "30" },
    { from: "35", to: "45" },
    { from: "50", to: "65" },
  ],
  targetOther:
    "운영팀 여러분들 항상 고생이 많으십니다. 근데 제가 부탁드리고 싶은게 있는데요,, 그게 뭐냐면요,,,",
  targetAdisonPublisherIds: {
    mode: ["INCLUDE"],
    publisherIds: ["1", "2", "3"],
  },
};
