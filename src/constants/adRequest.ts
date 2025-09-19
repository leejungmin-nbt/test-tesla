export const TARGET_OFFERWALL = [
  {
    id: 1,
    code: "Adison Offerwall",
    name: "애디슨 오퍼월 국내",
  },
  {
    id: 2,
    code: "Adison Offerwall Global",
    name: "애디슨 오퍼월 글로벌",
  },
] as const;

export const AD_REQUEST_STATUS = [
  {
    id: 0,
    name: "전체",
  },
  {
    id: 1,
    name: "생성완료",
  },
  {
    id: 2,
    name: "검수요청",
  },
  {
    id: 3,
    name: "검수중",
  },
  {
    id: 4,
    name: "검수완료",
  },
] as const;

export const AD_REQUEST_REPORT_TYPE = [
  {
    id: 1,
    name: "NORMAL",
  },
  {
    id: 2,
    name: "CPP",
  },
  {
    id: 3,
    name: "CPS",
  },
  {
    id: 4,
    name: "CPQ",
  },
  {
    id: 5,
    name: "CPC",
  },
  {
    id: 6,
    name: "CPM",
  },
  {
    id: 7,
    name: "CPS_REWARD_FAIL",
  },
] as const;

export const TARGET_OS_OPTIONS = [
  {
    value: "1",
    label: "Android",
  },
  {
    value: "2",
    label: "iOS",
  },
] as const;

export const TARGET_GENDERS_OPTIONS = [
  {
    value: "man",
    label: "남성",
  },
  {
    value: "woman",
    label: "여성",
  },
] as const;

export const TARGET_COOKIEOVEN_PUBLISHER_TYPE_OPTIONS = [
  {
    value: "1",
    label: "WEBTOON",
  },
  {
    value: "2",
    label: "SERIES",
  },
];

export const AD_ACTION_TYPE_OPTIONS = [
  {
    value: "1",
    label: "WEB",
  },
  {
    value: "2",
    label: "APP",
  },
];
