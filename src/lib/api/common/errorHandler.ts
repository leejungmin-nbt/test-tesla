interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// 기본적인 API 에러 처리 함수
export const handleApiError = (error: unknown): ApiError => {
  // Axios 에러인 경우
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response: { status: number; data?: unknown };
    };
    const { status, data } = axiosError.response;

    const errorData = data as { message?: string } | undefined;
    return {
      code: `HTTP_${status}`,
      message: errorData?.message || "요청 처리 중 오류가 발생했습니다.",
      details: data,
    };
  }

  // 네트워크 에러인 경우
  if (error && typeof error === "object" && "request" in error) {
    const networkError = error as { request: unknown };
    return {
      code: "NETWORK_ERROR",
      message: "네트워크 연결을 확인해주세요.",
      details: networkError.request,
    };
  }

  // 기타 에러
  const errorMessage =
    error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
  return {
    code: "UNKNOWN_ERROR",
    message: errorMessage,
    details: error,
  };
};
