// JSON 데이터들을 import
import advertisers from "@/data/advertisers.json";
import categories from "@/data/categories.json";
import adTypes from "@/data/adTypes.json";
import adSettleTypes from "@/data/adSettleTypes.json";
import repeatParticipateTypes from "@/data/repeatParticipateTypes.json";
import helpRequestPersonalInfoTypes from "@/data/helpRequestPersonalInfoTypes.json";

// ID를 name으로 매핑하는 유틸리티 함수들
export const getAdvertiserName = (id: string): string => {
  const advertiser = advertisers.find((item) => item.id === Number(id));
  return advertiser?.name || id;
};

export const getCategoryName = (id: string): string => {
  const category = categories.find((item) => item.id === Number(id));
  return category?.name || id;
};

export const getAdTypeName = (id: string): string => {
  const adType = adTypes.find((item) => item.id === Number(id));
  return adType?.name || id;
};

export const getAdSettleTypeName = (id: string): string => {
  const adSettleType = adSettleTypes.find((item) => item.id === Number(id));
  return adSettleType?.name || id;
};

export const getRepeatParticipateTypeName = (id: string): string => {
  const repeatParticipateType = repeatParticipateTypes.find(
    (item) => item.id === Number(id)
  );
  return repeatParticipateType?.name || id;
};

export const getHelpRequestPersonalInfoTypeNames = (
  ids: string[]
): string[] => {
  return ids.map((id) => {
    const helpRequestPersonalInfoType = helpRequestPersonalInfoTypes.find(
      (item) => item.id === Number(id)
    );
    return helpRequestPersonalInfoType?.name || id;
  });
};

// 리포트 타입 매핑 (임시 - 실제 데이터가 없으므로)
export const getReportTypeName = (id: string): string => {
  const reportTypeMap: { [key: string]: string } = {
    "1": "일일 리포트",
    "2": "주간 리포트",
    "3": "월간 리포트",
  };
  return reportTypeMap[id] || id;
};

// 광고 액션 타입 매핑 (임시 - 실제 데이터가 없으므로)
export const getAdActionTypeName = (id: string): string => {
  const adActionTypeMap: { [key: string]: string } = {
    "1": "설치",
    "2": "실행",
    "3": "구매",
    "4": "회원가입",
  };
  return adActionTypeMap[id] || id;
};

// 타겟 OS 매핑 (임시 - 실제 데이터가 없으므로)
export const getTargetOsNames = (ids: string[]): string[] => {
  const osMap: { [key: string]: string } = {
    "1": "Android",
    "2": "iOS",
    "3": "Web",
  };
  return ids.map((id) => osMap[id] || id);
};

// 타겟 성별 매핑 (임시 - 실제 데이터가 없으므로)
export const getTargetGenderNames = (ids: string[]): string[] => {
  const genderMap: { [key: string]: string } = {
    "1": "남성",
    "2": "여성",
  };
  return ids.map((id) => genderMap[id] || id);
};

// 애디슨 매체 집행 방식 매핑
export const getAdisonPublisherModeNames = (modes: string[]): string[] => {
  const modeMap: { [key: string]: string } = {
    ALL: "전체",
    INCLUDE: "지정",
    EXCLUDE: "제외",
  };
  return modes.map((mode) => modeMap[mode] || mode);
};
