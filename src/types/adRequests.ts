// 광고 요청 생성 요청 타입 (기존 스키마와 일치)

import { TARGET_OFFERWALL } from "@/constants/adRequest";

export type TargetOfferwallId = (typeof TARGET_OFFERWALL)[number]["id"];

export interface AdRequest {
  id: number;
  name: string;
  status: number;
  targets: TargetOfferwallId[];
  memo: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdRequestDetail extends AdRequest {
  id: number;
  content: CreateAdRequestRequest;
}

//form용 타입
export interface CreateAdRequestFormData {
  //step1
  title: string;
  advertiserId: string; //
  brand: string;
  adVendor: string;
  categoryId: string; //
  advertiserIntegrationId: string; //
  reportType: string; //
  repeatParticipateTypeId: string; //
  helpRequestPersonalInfoTypeIds: string[]; //
  advertiserCsManagerNames?: string;
  advertiserCsManagerEmails: string;

  //step2
  targetCookieovenPublisherIds: string[]; //
  adActionTypeId: string; //
  targetOs: string[]; //
  adTypeId: string; //
  startAt: string;
  endAt: string;
  targetTimes?: {
    from: string;
    to: string;
  }[];
  landingUrl: {
    default: string;
    android: string;
    ios: string;
  };
  viewAssets: {
    thumbnailFeed: string;
    thumbnailIcon: string;
    title: string;
    subtitle: string;
    detailImage: string;
    navigationTitle: string;
    detailTitle: string;
    detailSubtitle: string;
    callToAction: string;
    notice: string;
  };
  adSettleTypeId: string; //
  cost: string; //
  minPaymentAmount: string; //
  budget: string; //
  dailyActionCap: string; //
  delayTerm: string; //
  participateExpiredAt: string; //
  targetGenders?: string[];
  targetAges?: {
    from: string;
    to: string;
  }[];
  targetOther?: string;
  targetAdisonPublisherIds: {
    mode: string[];
    publisherIds: string[]; //
  };
}

// API로 보낼 타입
export interface CreateAdRequestRequest {
  //step1
  title: string;
  advertiserId: number; // API에서는 number
  brand: string;
  adVendor: string;
  categoryId: number; // API에서는 number
  advertiserIntegrationId: number; // API에서는 number
  reportType: number; // API에서는 number
  repeatParticipateTypeId: number; // API에서는 number
  helpRequestPersonalInfoTypeIds: number[]; // API에서는 number[]
  advertiserCsManagerNames: string;
  advertiserCsManagerEmails: string;

  //step2
  targetCookieovenPublisherIds: number[]; // API에서는 number[]
  adActionTypeId: number; // API에서는 number
  targetOs: number[]; // API에서는 number[]
  adTypeId: number; // API에서는 number
  startAt: string;
  endAt: string;
  targetTimes?: {
    from: string;
    to: string;
  }[];
  landingUrl: {
    default: string;
    android: string;
    ios: string;
  };
  viewAssets: {
    thumbnailFeed: string;
    thumbnailIcon: string;
    title: string;
    subtitle: string;
    detailImage: string;
    navigationTitle: string;
    detailTitle: string;
    detailSubtitle: string;
    callToAction: string;
    notice: string;
  };
  adSettleTypeId: number; // API에서는 number
  cost: number; // API에서는 number
  minPaymentAmount: number; // API에서는 number
  budget: number; // API에서는 number
  dailyActionCap: number; // API에서는 number
  delayTerm: number; // API에서는 number
  participateExpiredAt: number; // API에서는 number
  targetGenders?: string[];
  targetAges?: {
    from: string;
    to: string;
  }[];
  targetOther?: string;
  targetAdisonPublisherIds: {
    mode: string[];
    publisherIds: number[]; // API에서는 number[]
  };
}
