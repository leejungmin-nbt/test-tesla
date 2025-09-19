/**
 * localStorage 관련 유틸리티 함수들
 */

const STORAGE_KEY = "adRequestCreateFormData";

/**
 * 폼 데이터를 localStorage에 저장합니다.
 */
export const saveFormData = <T>(formData: T): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error("Failed to save form data to localStorage:", error);
  }
};

/**
 * localStorage에서 폼 데이터를 불러옵니다.
 */
export const loadFormData = <T>(): T | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
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
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear form data from localStorage:", error);
  }
};
