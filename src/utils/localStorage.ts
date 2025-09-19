/**
 * localStorage 관련 유틸리티 함수들
 */

// 폼 데이터 저장용 키
const FORM_STORAGE_KEY = "adRequestCreateFormData";
// 광고 요청 목록 저장용 키
const AD_REQUESTS_STORAGE_KEY = "adRequests";

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
 * 광고 요청 목록을 localStorage에 저장합니다.
 */
export const saveAdRequests = (adRequests: unknown[]): void => {
  try {
    localStorage.setItem(AD_REQUESTS_STORAGE_KEY, JSON.stringify(adRequests));
  } catch (error) {
    console.error("Failed to save ad requests to localStorage:", error);
  }
};

/**
 * localStorage에서 광고 요청 목록을 불러옵니다.
 */
export const loadAdRequests = (): unknown[] => {
  try {
    const savedData = localStorage.getItem(AD_REQUESTS_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : [];
  } catch (error) {
    console.error("Failed to load ad requests from localStorage:", error);
    return [];
  }
};

/**
 * 새로운 광고 요청을 localStorage에 추가합니다.
 */
export const addAdRequest = (adRequest: unknown): void => {
  try {
    const existingRequests = loadAdRequests();
    const newId =
      existingRequests.length > 0
        ? Math.max(...existingRequests.map((r: any) => r.id)) + 1
        : 1;
    const newAdRequest = {
      ...(adRequest as any),
      id: newId,
      status: 1, // 검수중 상태로 기본 설정
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    existingRequests.push(newAdRequest);
    saveAdRequests(existingRequests);
  } catch (error) {
    console.error("Failed to add ad request to localStorage:", error);
  }
};

/**
 * 특정 광고 요청의 상태를 업데이트합니다.
 */
export const updateAdRequestStatus = (id: number, status: number): void => {
  try {
    const existingRequests = loadAdRequests();
    const updatedRequests = existingRequests.map((request: any) =>
      request.id === id
        ? { ...request, status, updatedAt: new Date().toISOString() }
        : request
    );
    saveAdRequests(updatedRequests);
  } catch (error) {
    console.error("Failed to update ad request status in localStorage:", error);
  }
};

/**
 * 모든 localStorage 데이터를 초기화합니다.
 */
export const clearAllLocalStorage = (): void => {
  try {
    // 광고 요청 관련 데이터 초기화
    localStorage.removeItem(AD_REQUESTS_STORAGE_KEY);
    localStorage.removeItem(FORM_STORAGE_KEY);

    // 다른 관련 데이터가 있다면 여기에 추가
    // localStorage.removeItem('other_key');

    console.log("All localStorage data has been cleared");
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
};
