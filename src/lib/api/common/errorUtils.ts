import { ApiErrorType } from "@/types/api";

// 에러 타입 구별 함수
export const getErrorType = (error: unknown): ApiErrorType => {
  if (!error || typeof error !== "object") {
    return "NETWORK_ERROR";
  }

  const axiosError = error as { response?: { status: number } };
  const status = axiosError.response?.status;

  if (status && status >= 400 && status < 500) {
    return "CLIENT_ERROR";
  } else if (status && status >= 500) {
    return "SERVER_ERROR";
  }

  return "NETWORK_ERROR";
};

// 에러 메시지 추출 함수
export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  // API Routes에서 반환한 에러 메시지가 있는 경우
  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  // 기본 에러 메시지
  return axiosError.message || "알 수 없는 오류가 발생했습니다.";
};
