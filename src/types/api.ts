import ERROR_CODES from "@/constants/error";

export interface BaseApiResult {
  code?: string;
  message?: string;
  status?: number;
}

export interface BasePaginationResponse {
  page: number;
  itemsPerPage: number;
  totalCount: number;
  totalPages: number;
}

export interface BaseApiResponse<T = unknown> {
  success: boolean;
  data: T;
  result?: BaseApiResult;
  pageInfo?: BasePaginationResponse;
}

export interface ApiErrorResponse<T = unknown> {
  success: false;
  data: T;
  message?: string;
  code?: ApiErrorCode;
  status: number;
}

export type ApiErrorType = "CLIENT_ERROR" | "SERVER_ERROR" | "NETWORK_ERROR";

export type ApiErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
