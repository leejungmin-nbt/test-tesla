import { clientApi } from "@/lib/api/client";
import {
  CreateAdRequestRequest,
  AdRequest,
  AdRequestDetail,
} from "@/types/adRequests";
import { BaseApiResponse } from "@/types/api";

const AD_REQUESTS_BFF_ROUTES = {
  LIST: "/ad-requests",
  DETAIL: (id: string) => `/ad-requests/${id}`,
  CREATE: "/ad-requests",
  APPROVE: (id: string) => `/ad-requests/${id}/approve`,
} as const;

// 광고 요청 목록 조회
export const getAdRequests = async () => {
  const { data: response } = await clientApi.get<BaseApiResponse<AdRequest[]>>(
    AD_REQUESTS_BFF_ROUTES.LIST
  );

  return response.data;
};

// 광고 요청 상세 조회
export const getAdRequestDetail = async (id: string) => {
  const { data: response } = await clientApi.get<
    BaseApiResponse<AdRequestDetail>
  >(AD_REQUESTS_BFF_ROUTES.DETAIL(id));

  return response.data;
};

// 광고 요청 등록
export const createAdRequest = async (formData: CreateAdRequestRequest) => {
  const { data } = await clientApi.post(
    AD_REQUESTS_BFF_ROUTES.CREATE,
    formData
  );

  return data;
};

// 광고 요청 검수 상태 변경
export const approveAdRequest = async (id: string) => {
  const { data } = await clientApi.post(AD_REQUESTS_BFF_ROUTES.APPROVE(id));
  return data;
};
