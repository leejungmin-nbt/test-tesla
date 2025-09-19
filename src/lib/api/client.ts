import axios from "axios";

export const clientApi = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    //브라우저에서 에러 콘솔을 확인하기 위한 테스트용 분기 나중에 필요 없으면 지워야함
    const status = error.response?.status;

    if (status >= 400 && status < 500) {
      // 클라이언트 에러 (4xx)
      console.warn("Client Error:", error.response?.data);
    } else if (status >= 500) {
      // 서버 에러 (5xx)
      console.error("Server Error:", error.response?.data);
    } else {
      // 네트워크 에러
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);
