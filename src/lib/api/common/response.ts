import {
  ApiErrorCode,
  ApiErrorResponse,
  BaseApiResult,
  BaseApiResponse,
  BasePaginationResponse,
} from "@/types/api";

// 일관된 응답 생성용 함수
export const createResponse = <T>({
  data,
  result,
  pageInfo,
}: {
  data: T;
  result?: BaseApiResult;
  pageInfo?: BasePaginationResponse;
}): BaseApiResponse<T> => ({
  success: true,
  data,
  result,
  pageInfo,
});

// 일관된 에러 생성용 함수
export const createErrorResponse = ({
  message,
  status,
  code,
}: {
  message: string;
  status: number;
  code?: ApiErrorCode;
}): ApiErrorResponse<undefined> => ({
  success: false,
  data: undefined,
  message,
  code,
  status,
});
