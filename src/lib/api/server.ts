import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import qs from "qs";

//요청시에 변환을 제외할 키 값의 목록입니다.
const REQ_EXCLUDE_KEYS: string[] = [];
//응답시에 변환을 제외할 키 값의 목록입니다.
const RES_EXCLUDE_KEYS: string[] = [];

const isJson = (headers?: Record<string, string>) => {
  const contentType = String(
    headers?.["content-type"] ?? headers?.["Content-Type"] ?? ""
  );
  return contentType.includes("application/json") || contentType === "";
};

export const serverApi = axios.create({
  // baseURL: process.env.NEXT_API_SERVER_BASE_URL,
  baseURL: process.env.NEXT_API_SERVER_BASE_URL_IN_DOCKER,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

serverApi.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};

  if (config.params && typeof config.params === "object") {
    config.params = snakecaseKeys(config.params, {
      deep: true,
      exclude: REQ_EXCLUDE_KEYS,
    });
    config.paramsSerializer = (p) => qs.stringify(p, { arrayFormat: "repeat" });
  }

  const isFormData =
    typeof FormData !== "undefined" && config.data instanceof FormData;

  if (
    config.data &&
    typeof config.data === "object" &&
    !isFormData &&
    isJson(config.headers)
  ) {
    config.data = snakecaseKeys(config.data, {
      deep: true,
      exclude: REQ_EXCLUDE_KEYS,
    });
  }
  return config;
});

serverApi.interceptors.response.use(
  (response) => {
    if (
      isJson(response.headers as Record<string, string>) &&
      response.data &&
      typeof response.data === "object"
    ) {
      response.data = camelcaseKeys(response.data, {
        deep: true,
        exclude: RES_EXCLUDE_KEYS,
      });
    }
    return response;
  },
  (error) => {
    console.error("Backend API Error >> ", error.response?.data);
    return Promise.reject(error);
  }
);
