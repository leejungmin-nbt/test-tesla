import { format, parseISO, isValid } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);

    if (!isValid(date)) {
      return dateString;
    }

    return format(date, "yyyy년 MM월 dd일 HH:mm", { locale: ko });
  } catch (error) {
    console.error("날짜 포맷팅 오류 >> ", error);
    return dateString;
  }
};
