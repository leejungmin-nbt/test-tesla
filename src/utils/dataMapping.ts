import advertisersData from "@/data/advertisers.json";
import categoriesData from "@/data/categories.json";
import adTypesData from "@/data/adTypes.json";
import adSettleTypesData from "@/data/adSettleTypes.json";
import repeatParticipateTypesData from "@/data/repeatParticipateTypes.json";
import helpRequestPersonalInfoTypesData from "@/data/helpRequestPersonalInfoTypes.json";
import advertiserIntegrationsData from "@/data/advertiserIntegrations.json";
import publishersData from "@/data/publishers.json";
import {
  AD_ACTION_TYPE_OPTIONS,
  AD_REQUEST_REPORT_TYPE,
  TARGET_COOKIEOVEN_PUBLISHER_TYPE_OPTIONS,
  TARGET_GENDERS_OPTIONS,
  TARGET_OS_OPTIONS,
} from "@/constants/adRequest";

export const getAdvertiserName = (id: string) => {
  const advertiser = advertisersData.find((adv) => adv.id.toString() === id);
  return advertiser?.name || id;
};

export const getCategoryName = (id: string) => {
  const category = categoriesData.find((cat) => cat.id.toString() === id);
  return category?.name || id;
};

export const getAdTypeName = (id: string) => {
  const adType = adTypesData.find((type) => type.id.toString() === id);
  return adType?.name || id;
};

export const getAdSettleTypeName = (id: string) => {
  const settleType = adSettleTypesData.find(
    (type) => type.id.toString() === id
  );
  return settleType?.name || id;
};

export const getRepeatParticipateTypeName = (id: string) => {
  const type = repeatParticipateTypesData.find((t) => t.id.toString() === id);
  return type?.name || id;
};

export const getHelpRequestPersonalInfoTypeNames = (ids: string[]) => {
  return ids.map((id) => {
    const type = helpRequestPersonalInfoTypesData.find(
      (t) => t.id.toString() === id
    );
    return type?.name || id;
  });
};

export const getReportTypeName = (id: string) => {
  return AD_REQUEST_REPORT_TYPE.find((type) => type.id === Number(id))?.name;
};

export const getAdActionTypeName = (id: string) => {
  return AD_ACTION_TYPE_OPTIONS.find((a) => a.value === id)?.label || id;
};

export const getOsNames = (os: string[]) => {
  return os.map(
    (o) => TARGET_OS_OPTIONS.find((os) => os.value === o)?.label || o
  );
};

export const getGenderNames = (genders: string[]) => {
  return genders.map(
    (gender) =>
      TARGET_GENDERS_OPTIONS.find((g) => g.value === gender)?.label || gender
  );
};

export const getAdisonModeName = (mode: string[]) => {
  const modeMap: { [key: string]: string } = {
    ALL: "전체",
    INCLUDE: "지정매체",
    EXCLUDE: "제외매체",
  };
  return mode.map((m) => modeMap[m] || m);
};

export const getPublisherNames = (ids: (string | number)[]) => {
  return ids.map((id) => {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;
    const publisher = publishersData.find((item) => item.id === numericId);
    return publisher?.name || id.toString();
  });
};

export const getAdvertiserIntegrationName = (id: string) => {
  const integration = advertiserIntegrationsData.find(
    (int) => int.id.toString() === id
  );
  return integration?.name || id;
};

export const getCookieovenPublisherNames = (ids: string[]) => {
  return ids.map(
    (id) =>
      TARGET_COOKIEOVEN_PUBLISHER_TYPE_OPTIONS.find((p) => p.value === id)
        ?.label || id
  );
};
