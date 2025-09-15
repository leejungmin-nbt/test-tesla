"use client";

import { Modal } from "@/components/common/Modal";
import { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";
import adTypesData from "@/data/adTypes.json";
import adSettleTypesData from "@/data/adSettleTypes.json";
import categoriesData from "@/data/categories.json";
import advertisersData from "@/data/advertisers.json";
import advertiserIntegrationsData from "@/data/advertiserIntegrations.json";
import repeatParticipateTypesData from "@/data/repeatParticipateTypes.json";
import helpRequestPersonalInfoTypesData from "@/data/helpRequestPersonalInfoTypes.json";
import adisonMediaData from "@/data/adisonMedia.json";

interface ConfirmRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: AdRequestCreateFormType;
}

const ConfirmRegistrationModal: React.FC<ConfirmRegistrationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  formData,
}) => {
  // 데이터 매핑 함수들
  const getAdTypeName = (id: string) => {
    const adType = adTypesData.find((type) => type.id.toString() === id);
    return adType?.name || id;
  };

  const getAdSettleTypeName = (id: string) => {
    const settleType = adSettleTypesData.find(
      (type) => type.id.toString() === id
    );
    return settleType?.name || id;
  };

  const getCategoryName = (id: string) => {
    const category = categoriesData.find((cat) => cat.id.toString() === id);
    return category?.name || id;
  };

  const getAdvertiserName = (id: string) => {
    const advertiser = advertisersData.find((adv) => adv.id.toString() === id);
    return advertiser?.name || id;
  };

  const getAdvertiserIntegrationName = (id: string) => {
    const integration = advertiserIntegrationsData.find(
      (int) => int.id.toString() === id
    );
    return integration?.name || id;
  };

  const getRepeatParticipateTypeName = (id: string) => {
    const type = repeatParticipateTypesData.find((t) => t.id.toString() === id);
    return type?.name || id;
  };

  const getHelpRequestPersonalInfoTypeNames = (ids: string[]) => {
    return ids.map((id) => {
      const type = helpRequestPersonalInfoTypesData.find(
        (t) => t.id.toString() === id
      );
      return type?.name || id;
    });
  };

  const getGenderNames = (genders: string[]) => {
    const genderMap: { [key: string]: string } = {
      Male: "남성",
      Female: "여성",
      Etc: "기타",
    };
    return genders.map((gender) => genderMap[gender] || gender);
  };

  const getOsNames = (os: string[]) => {
    const osMap: { [key: string]: string } = {
      Android: "Android",
      iOS: "iOS",
    };
    return os.map((o) => osMap[o] || o);
  };

  const getCookieovenPublisherNames = (ids: string[]) => {
    const publisherMap: { [key: string]: string } = {
      "1": "웹툰",
      "2": "시리즈",
    };
    return ids.map((id) => publisherMap[id] || id);
  };

  const getAdActionTypeName = (id: string) => {
    const actionTypeMap: { [key: string]: string } = {
      "1": "WEB",
      "2": "APP",
    };
    return actionTypeMap[id] || id;
  };

  const getAdisonMediaNames = (ids: (string | number)[]) => {
    return ids.map((id) => {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;
      const media = adisonMediaData.find((item) => item.id === numericId);
      return media?.name || id.toString();
    });
  };

  const getAdisonModeName = (mode: string[]) => {
    const modeMap: { [key: string]: string } = {
      ALL: "전체",
      INCLUDE: "지정매체",
      EXCLUDE: "제외매체",
    };
    return mode.map((m) => modeMap[m] || m);
  };

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return value.toString();
    return `${numValue.toLocaleString()}원`;
  };

  const formatCount = (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return value.toString();
    return `${numValue.toLocaleString()}개`;
  };

  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    } catch {
      return isoString;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="광고 요청 등록 확인"
      description="입력하신 정보를 최종 확인해주세요."
      cancelText="취소"
      confirmText="등록"
      size="3xl"
    >
      <div className="modal-content-3xl space-y-6 overflow-y-auto">
        {/* 캠페인 정보 */}
        <div className="space-y-3">
          <h3 className="border-b pb-2 text-lg font-semibold text-gray-900">
            캠페인 정보
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">제목:</span>
              <p className="text-gray-900">{formData.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">광고주:</span>
              <p className="text-gray-900">
                {getAdvertiserName(formData.advertiserId)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">브랜드:</span>
              <p className="text-gray-900">{formData.brand}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">광고 대행사:</span>
              <p className="text-gray-900">{formData.adVendor}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">카테고리:</span>
              <p className="text-gray-900">
                {getCategoryName(formData.categoryId)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">광고주 연동:</span>
              <p className="text-gray-900">
                {getAdvertiserIntegrationName(formData.advertiserIntegrationId)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">리포트 타입:</span>
              <p className="text-gray-900">{formData.reportType}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">재참여 타입:</span>
              <p className="text-gray-900">
                {getRepeatParticipateTypeName(formData.repeatParticipateTypeId)}
              </p>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-600">
                개인정보 수집 동의:
              </span>
              <p className="text-gray-900">
                {getHelpRequestPersonalInfoTypeNames(
                  formData.helpRequestPersonalInfoTypeIds
                ).join(", ")}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">CS 담당자명:</span>
              <p className="text-gray-900">
                {formData.advertiserCsManagerNames}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                CS 담당자 이메일:
              </span>
              <p className="text-gray-900">
                {formData.advertiserCsManagerEmails}
              </p>
            </div>
          </div>
        </div>

        {/* 광고 정보 */}
        <div className="space-y-3">
          <h3 className="border-b pb-2 text-lg font-semibold text-gray-900">
            광고 정보
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">쿠키오븐 매체:</span>
              <p className="text-gray-900">
                {getCookieovenPublisherNames(
                  formData.targetCookieovenPublisherIds || []
                ).join(", ")}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                애디슨 매체 집행:
              </span>
              <p className="text-gray-900">
                {(() => {
                  const modes = getAdisonModeName(
                    formData.targetAdisonPublisherIds?.mode || []
                  );
                  const publisherIds =
                    formData.targetAdisonPublisherIds?.publisherIds || [];

                  if (modes.includes("전체")) {
                    return "전체";
                  } else if (
                    modes.includes("지정매체") &&
                    publisherIds.length > 0
                  ) {
                    const mediaNames = getAdisonMediaNames(publisherIds);
                    return `지정매체: ${mediaNames.join(", ")}`;
                  } else if (
                    modes.includes("제외매체") &&
                    publisherIds.length > 0
                  ) {
                    const mediaNames = getAdisonMediaNames(publisherIds);
                    return `제외매체: ${mediaNames.join(", ")}`;
                  } else {
                    return modes.join(", ");
                  }
                })()}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">광고 액션 타입:</span>
              <p className="text-gray-900">
                {getAdActionTypeName(formData.adActionTypeId)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">타겟 OS:</span>
              <p className="text-gray-900">
                {getOsNames(formData.targetOs).join(", ")}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">광고 타입:</span>
              <p className="text-gray-900">
                {getAdTypeName(formData.adTypeId)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">시작일:</span>
              <p className="text-gray-900">
                {formatDateTime(formData.startAt)}
              </p>
            </div>

            <div>
              <span className="font-medium text-gray-600">타겟 시간:</span>
              <p className="text-gray-900">
                {formData.targetTimes.from} ~ {formData.targetTimes.to}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">종료일:</span>
              <p className="text-gray-900">{formatDateTime(formData.endAt)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">랜딩 URL:</span>
              <p className="text-gray-900">
                기본: {formData.landingUrl.default}
                {formData.landingUrl.android &&
                  `, Android: ${formData.landingUrl.android}`}
                {formData.landingUrl.ios && `, iOS: ${formData.landingUrl.ios}`}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">광고 정산 타입:</span>
              <p className="text-gray-900">
                {getAdSettleTypeName(formData.adSettleTypeId)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">비용:</span>
              <p className="text-gray-900">{formatCurrency(formData.cost)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">최소 지급 금액:</span>
              <p className="text-gray-900">
                {formatCurrency(formData.minPaymentAmount)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">예산:</span>
              <p className="text-gray-900">{formatCurrency(formData.budget)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                일일 물량 자동 설정:
              </span>
              <p className="text-gray-900">
                {formatCount(formData.dailyActionCap)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">후지급 시간:</span>
              <p className="text-gray-900">{formData.delayTerm}시간</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                완료 인정 유효기간:
              </span>
              <p className="text-gray-900">{formData.participateExpiredAt}일</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">타겟 성별:</span>
              <p className="text-gray-900">
                {getGenderNames(formData.targetGenders || []).join(", ")}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">타겟 나이:</span>
              <p className="text-gray-900">
                {formData.targetAges?.from || ""}세 ~{" "}
                {formData.targetAges?.to || ""}세
              </p>
            </div>
          </div>
        </div>

        {/* 뷰 에셋 정보 */}
        <div className="space-y-3">
          <h3 className="border-b pb-2 text-lg font-semibold text-gray-900">
            뷰 에셋 정보
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">썸네일 피드:</span>
              <p className="break-all text-gray-900">
                {formData.viewAssets.thumbnailFeed}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">썸네일 아이콘:</span>
              <p className="break-all text-gray-900">
                {formData.viewAssets.thumbnailIcon}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">제목:</span>
              <p className="text-gray-900">{formData.viewAssets.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">부제목:</span>
              <p className="text-gray-900">{formData.viewAssets.subtitle}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">상세 이미지:</span>
              <p className="break-all text-gray-900">
                {formData.viewAssets.detailImage}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                네비게이션 제목:
              </span>
              <p className="text-gray-900">
                {formData.viewAssets.navigationTitle}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">상세 제목:</span>
              <p className="text-gray-900">{formData.viewAssets.detailTitle}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">상세 부제목:</span>
              <p className="text-gray-900">
                {formData.viewAssets.detailSubtitle}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">CTA:</span>
              <p className="text-gray-900">
                {formData.viewAssets.callToAction}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">공지사항:</span>
              <p className="text-gray-900">{formData.viewAssets.notice}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmRegistrationModal;
