/**
 * localStorage 관련 유틸리티 함수들
 */

import type { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";

const FORM_STORAGE_KEY = "adRequestCreateFormData";
const AD_REQUESTS_STORAGE_KEY = "adRequests";

// 등록된 광고 요청 타입
export interface StoredAdRequest extends Record<string, unknown> {
  id: number;
  title: string;
  company: string;
  status: string;
  createdAt: string;
  budget: string;
  formData: AdRequestCreateFormType;
}

/**
 * 폼 데이터를 localStorage에 저장합니다.
 */
export const saveFormData = <T>(formData: T): void => {
  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error("Failed to save form data to localStorage:", error);
  }
};

/**
 * localStorage에서 폼 데이터를 불러옵니다.
 */
export const loadFormData = <T>(): T | null => {
  try {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error("Failed to load form data from localStorage:", error);
    return null;
  }
};

/**
 * localStorage에서 폼 데이터를 삭제합니다.
 */
export const clearFormData = (): void => {
  try {
    localStorage.removeItem(FORM_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear form data from localStorage:", error);
  }
};

/**
 * 등록된 광고 요청을 localStorage에 저장합니다.
 */
export const saveAdRequest = (adRequest: StoredAdRequest): void => {
  try {
    const existingRequests = getAdRequests();
    const updatedRequests = [...existingRequests, adRequest];
    localStorage.setItem(
      AD_REQUESTS_STORAGE_KEY,
      JSON.stringify(updatedRequests)
    );
  } catch (error) {
    console.error("Failed to save ad request to localStorage:", error);
  }
};

/**
 * localStorage에서 등록된 광고 요청 목록을 불러옵니다.
 */
export const getAdRequests = (): StoredAdRequest[] => {
  try {
    const savedData = localStorage.getItem(AD_REQUESTS_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : [];
  } catch (error) {
    console.error("Failed to load ad requests from localStorage:", error);
    return [];
  }
};

/**
 * 특정 ID의 광고 요청을 불러옵니다.
 */
export const getAdRequestById = (id: number): StoredAdRequest | null => {
  try {
    const requests = getAdRequests();
    return requests.find((request) => request.id === id) || null;
  } catch (error) {
    console.error("Failed to load ad request by id from localStorage:", error);
    return null;
  }
};

/**
 * 광고 요청의 상태를 업데이트합니다.
 */
export const updateAdRequestStatus = (id: number, status: string): void => {
  try {
    const requests = getAdRequests();
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
    localStorage.setItem(
      AD_REQUESTS_STORAGE_KEY,
      JSON.stringify(updatedRequests)
    );
  } catch (error) {
    console.error("Failed to update ad request status in localStorage:", error);
  }
};
