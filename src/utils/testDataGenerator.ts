/**
 * 테스트 데이터 생성 유틸리티
 */

import type { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";
import advertisersData from "@/data/advertisers.json";
import categoriesData from "@/data/categories.json";
import advertiserIntegrationsData from "@/data/advertiserIntegrations.json";
import helpRequestPersonalInfoTypesData from "@/data/helpRequestPersonalInfoTypes.json";
import repeatParticipateTypesData from "@/data/repeatParticipateTypes.json";
import adTypesData from "@/data/adTypes.json";
import adSettleTypesData from "@/data/adSettleTypes.json";
import adisonMediaData from "@/data/adisonMedia.json";

// 랜덤 데이터 배열들
const companyNames = [
  "테슬라 코리아",
  "현대자동차",
  "기아자동차",
  "BMW 코리아",
  "메르세데스-벤츠 코리아",
  "아우디 코리아",
  "볼보자동차",
  "포르쉐 코리아",
  "랜드로버 코리아",
  "재규어 코리아",
  "캐딜락 코리아",
  "링컨 코리아",
  "인피니티 코리아",
  "렉서스 코리아",
  "제네시스",
  "네이버",
  "카카오",
  "삼성전자",
  "LG전자",
  "SK텔레콤",
  "KT",
  "LG유플러스",
  "쿠팡",
  "배달의민족",
  "토스",
  "카카오뱅크",
  "신한은행",
  "하나은행",
  "우리은행",
  "삼성생명",
  "한화생명",
  "DB생명",
  "현대해상",
  "삼성화재",
  "KB손해보험",
];

const brandNames = [
  "테슬라",
  "현대",
  "기아",
  "BMW",
  "메르세데스-벤츠",
  "아우디",
  "볼보",
  "포르쉐",
  "랜드로버",
  "재규어",
  "캐딜락",
  "링컨",
  "인피니티",
  "렉서스",
  "제네시스",
  "네이버",
  "카카오",
  "삼성",
  "LG",
  "SK",
  "KT",
  "LG+",
  "쿠팡",
  "배민",
  "토스",
  "카카오뱅크",
  "신한",
  "하나",
  "우리",
  "삼성생명",
  "한화",
  "DB",
  "현대해상",
  "삼성화재",
  "KB",
];

const campaignTitles = [
  "신차 출시 기념 프로모션",
  "연말 특가 이벤트",
  "신규 고객 대상 혜택",
  "VIP 고객 전용 서비스",
  "한정 수량 특가 상품",
  "신제품 런칭 캠페인",
  "고객 만족도 향상 프로젝트",
  "브랜드 인지도 제고 캠페인",
  "디지털 전환 프로모션",
  "친환경 정책 홍보",
  "스마트 기술 소개",
  "고객 서비스 개선",
  "신규 서비스 런칭",
  "시즌 한정 이벤트",
  "고객 추천 프로그램",
  "브랜드 스토리 홍보",
  "기술 혁신 소개",
  "고객 피드백 반영",
  "신규 파트너십 발표",
  "지속가능성 프로젝트",
];

const adTitles = [
  "혁신적인 기술로 만나는 미래",
  "당신의 선택이 세상을 바꿉니다",
  "더 나은 내일을 위한 첫 걸음",
  "전문가가 추천하는 솔루션",
  "고객 만족도 1위 브랜드",
  "신뢰할 수 있는 파트너",
  "혁신과 전통의 만남",
  "고객 중심의 서비스",
  "지속가능한 미래를 위한 선택",
  "전문성과 혁신의 조화",
  "고객의 성공이 우리의 목표",
  "차별화된 경험을 제공합니다",
  "신뢰와 품질의 보장",
  "고객과 함께 성장하는 기업",
  "혁신적인 솔루션으로 문제 해결",
  "전문성과 창의성의 결합",
  "고객 만족을 위한 끊임없는 노력",
  "미래를 준비하는 오늘의 선택",
];

const subtitles = [
  "지금 바로 시작하세요",
  "특별한 혜택을 놓치지 마세요",
  "전문가와 상담해보세요",
  "무료 체험 기회를 잡으세요",
  "한정 기간 특가",
  "고객만을 위한 특별 서비스",
  "지금 신청하면 추가 혜택",
  "전문 상담사가 도와드립니다",
  "안전하고 신뢰할 수 있는 선택",
  "고객의 성공을 위한 파트너",
  "차별화된 솔루션을 경험하세요",
  "전문성으로 보장하는 품질",
  "고객 중심의 서비스 철학",
  "혁신적인 기술력으로 승부",
  "신뢰할 수 있는 브랜드 가치",
];

const callToActions = [
  "지금 시작하기",
  "무료 상담 신청",
  "더 알아보기",
  "바로 신청하기",
  "체험해보기",
  "상담 문의하기",
  "지금 확인하기",
  "무료 견적 받기",
  "바로 구매하기",
  "예약하기",
  "신청하기",
  "문의하기",
  "확인하기",
  "시작하기",
  "체험하기",
  "상담하기",
  "구매하기",
];

const notices = [
  "한정 수량으로 조기 마감될 수 있습니다.",
  "서비스 이용 시 약관이 적용됩니다.",
  "개인정보는 서비스 제공 목적으로만 사용됩니다.",
  "고객센터로 문의하시면 친절히 안내해드립니다.",
  "서비스 이용 전 상세 내용을 확인해주세요.",
  "변경 및 취소 시 별도 수수료가 발생할 수 있습니다.",
  "서비스 제공 지역에 따라 제한이 있을 수 있습니다.",
  "고객 만족을 위해 지속적으로 개선하고 있습니다.",
  "안전한 서비스 이용을 위해 정기 점검을 실시합니다.",
  "고객의 소중한 의견을 기다리고 있습니다.",
];

// 랜덤 선택 함수
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 랜덤 날짜 생성 (현재 날짜 기준으로 1-30일 후)
const getRandomDate = (daysFromNow: number = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * daysFromNow) + 1);
  return date.toISOString().split("T")[0];
};

// 랜덤 시간 생성
const getRandomTime = (): string => {
  const hour = Math.floor(Math.random() * 12) + 8; // 8시~19시
  const minute = Math.random() < 0.5 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
};

// 랜덤 숫자 생성
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 랜덤 URL 생성
const getRandomUrl = (): string => {
  const domains = [
    "example.com",
    "demo.co.kr",
    "test.org",
    "sample.net",
    "demo.kr",
  ];
  const paths = [
    "product",
    "service",
    "campaign",
    "promotion",
    "event",
    "new",
    "special",
  ];
  const domain = getRandomItem(domains);
  const path = getRandomItem(paths);
  return `https://${domain}/${path}`;
};

// 랜덤 이미지 URL 생성
const getRandomImageUrl = (): string => {
  const services = ["picsum.photos", "via.placeholder.com", "loremflickr.com"];
  const service = getRandomItem(services);
  const width = getRandomNumber(300, 800);
  const height = getRandomNumber(200, 600);

  if (service === "picsum.photos") {
    return `https://${service}/${width}/${height}`;
  } else if (service === "via.placeholder.com") {
    return `https://${service}/${width}x${height}`;
  } else {
    return `https://${service}/${width}/${height}`;
  }
};

/**
 * 랜덤 테스트 데이터를 생성합니다.
 */
export const generateTestData = (): AdRequestCreateFormType => {
  const company = getRandomItem(companyNames);
  const brand = getRandomItem(brandNames);
  const campaignTitle = getRandomItem(campaignTitles);
  const adTitle = getRandomItem(adTitles);
  const subtitle = getRandomItem(subtitles);
  const cta = getRandomItem(callToActions);
  const notice = getRandomItem(notices);

  // 실제 JSON 데이터에서 랜덤 선택
  const advertiser = getRandomItem(advertisersData);
  const category = getRandomItem(categoriesData);
  const advertiserIntegration = getRandomItem(advertiserIntegrationsData);
  const repeatParticipateType = getRandomItem(repeatParticipateTypesData);
  const adType = getRandomItem(adTypesData);
  const adSettleType = getRandomItem(adSettleTypesData);

  // 개인정보 수집 항목 랜덤 선택 (1-3개)
  const personalInfoTypes = getRandomItems(
    helpRequestPersonalInfoTypesData,
    getRandomNumber(1, 3)
  );

  // 쿠키오븐 퍼블리셔 랜덤 선택 (2-4개)
  const cookieovenPublishers = getRandomItems(
    adisonMediaData,
    getRandomNumber(2, 4)
  );

  return {
    // Step 1: 캠페인 정보
    title: `${brand} ${campaignTitle}`,
    advertiserId: advertiser.id.toString(),
    brand: brand,
    adVendor: company,
    categoryId: category.id.toString(),
    advertiserIntegrationId: advertiserIntegration.id.toString(),
    reportType: "NORMAL", // 실제 데이터에 없으므로 고정값
    repeatParticipateTypeId: repeatParticipateType.id.toString(),
    helpRequestPersonalInfoTypeIds: personalInfoTypes.map((item) =>
      item.id.toString()
    ),
    advertiserCsManagerNames: `${getRandomItem([
      "김",
      "이",
      "박",
      "최",
      "정",
      "강",
      "조",
      "윤",
      "장",
      "임",
    ])}${getRandomItem([
      "민수",
      "지영",
      "현우",
      "서연",
      "준호",
      "미영",
      "성민",
      "예진",
      "동현",
      "수진",
    ])}`,
    advertiserCsManagerEmails: `manager${getRandomNumber(1, 999)}@${company
      .toLowerCase()
      .replace(/\s+/g, "")}.com`,

    // Step 2: 광고 정보
    targetCookieovenPublisherIds: getRandomItems(
      ["1", "2"],
      getRandomNumber(1, 2)
    ),
    adActionTypeId: "1", // 실제 데이터에 없으므로 고정값
    targetOs: getRandomItems(["Android", "iOS"], getRandomNumber(1, 2)),
    adTypeId: adType.id.toString(),
    startAt: getRandomDate(7),
    endAt: getRandomDate(30),
    targetTimes: {
      from: getRandomTime(),
      to: getRandomTime(),
    },
    landingUrl: {
      default: getRandomUrl(),
      android: getRandomUrl(),
      ios: getRandomUrl(),
    },
    viewAssets: {
      thumbnailFeed: getRandomImageUrl(),
      thumbnailIcon: getRandomImageUrl(),
      title: adTitle,
      subtitle: subtitle,
      detailImage: getRandomImageUrl(),
      navigationTitle: `${brand} 상세 정보`,
      detailTitle: adTitle,
      detailSubtitle: subtitle,
      callToAction: cta,
      notice: notice,
    },
    adSettleTypeId: adSettleType.id.toString(),
    cost: getRandomNumber(100, 5000).toString(),
    minPaymentAmount: getRandomNumber(10000, 100000).toString(),
    budget: getRandomNumber(1000000, 50000000).toString(),
    dailyActionCap: getRandomNumber(50, 1000).toString(),
    delayTerm: getRandomNumber(1, 14).toString(),
    participateExpiredAt: getRandomNumber(1, 30).toString(),
    targetGenders: getRandomItems(
      ["Male", "Female", "Etc"],
      getRandomNumber(1, 2)
    ),
    targetAges: {
      from: getRandomNumber(20, 40).toString(),
      to: getRandomNumber(41, 65).toString(),
    },
    targetAdisonPublisherIds: {
      mode: ["INCLUDE"],
      publisherIds: getRandomItems(
        adisonMediaData.map((item) => item.id.toString()),
        getRandomNumber(0, 3)
      ),
    },
  };
};
