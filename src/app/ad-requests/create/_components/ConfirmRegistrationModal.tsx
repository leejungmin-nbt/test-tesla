"use client";

import { Modal } from "@/components/common/Modal";
import { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";

import { formatDate } from "@/utils/date";
import {
  getAdvertiserName,
  getCategoryName,
  getReportTypeName,
  getRepeatParticipateTypeName,
  getHelpRequestPersonalInfoTypeNames,
  getAdTypeName,
  getAdActionTypeName,
  getOsNames,
  getGenderNames,
  getAdisonModeName,
  getPublisherNames,
  getAdvertiserIntegrationName,
  getAdSettleTypeName,
  getCookieovenPublisherNames,
} from "@/utils/dataMapping";

interface ConfirmRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: AdRequestCreateFormType;
  disabled: boolean;
}

const ConfirmRegistrationModal: React.FC<ConfirmRegistrationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  formData,
  disabled,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="광고 요청 등록 확인"
      description="입력하신 정보를 최종 확인해주세요."
      cancelText="취소"
      confirmText="등록"
      disabled={disabled}
      size="3xl"
    >
      <div className="modal-content-lg space-y-6 overflow-y-auto">
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
              <p className="text-gray-900">
                {getReportTypeName(formData.reportType)}
              </p>
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
                    const mediaNames = getPublisherNames(publisherIds);
                    return `지정매체: ${mediaNames.join(", ")}`;
                  } else if (
                    modes.includes("제외매체") &&
                    publisherIds.length > 0
                  ) {
                    const mediaNames = getPublisherNames(publisherIds);
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
              <p className="text-gray-900">{formatDate(formData.startAt)}</p>
            </div>

            <div>
              <span className="font-medium text-gray-600">타겟 시간:</span>
              <div className="text-gray-900">
                {formData.targetTimes && formData.targetTimes.length > 0 ? (
                  <div className="space-y-1">
                    {formData.targetTimes.map((timeRange, index) => (
                      <div key={index} className="text-sm">
                        {timeRange.from && timeRange.to
                          ? `${timeRange.from} ~ ${timeRange.to}`
                          : "시간 미설정"}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500">설정된 시간 없음</span>
                )}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">종료일:</span>
              <p className="text-gray-900">{formatDate(formData.endAt)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">랜딩 URL:</span>
              <div className="text-gray-900">
                <p>기본: {formData.landingUrl.default}</p>
                <p>Android: {formData.landingUrl.android}</p>
                <p>iOS: {formData.landingUrl.ios}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">광고 정산 타입:</span>
              <p className="text-gray-900">
                {getAdSettleTypeName(formData.adSettleTypeId)}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">비용:</span>
              <p className="text-gray-900">
                {Number(formData.cost).toLocaleString()}원
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">최소 지급 금액:</span>
              <p className="text-gray-900">
                {formData.minPaymentAmount
                  ? Number(formData.minPaymentAmount).toLocaleString() + "원"
                  : "-"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">예산:</span>
              <p className="text-gray-900">
                {Number(formData.budget).toLocaleString()}원
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                일일 물량 자동 설정:
              </span>
              <p className="text-gray-900">
                {Number(formData.dailyActionCap).toLocaleString()}개
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">후지급 시간:</span>
              <p className="text-gray-900">
                {formData.delayTerm ? `${formData.delayTerm}시간` : "-"}
              </p>
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
                {formData.targetGenders && formData.targetGenders.length > 0
                  ? getGenderNames(formData.targetGenders || []).join(", ")
                  : "-"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">타겟 나이:</span>
              <p className="text-gray-900">
                {formData.targetAges && formData.targetAges.length > 0
                  ? formData.targetAges
                      .map((age) => `${age.from}세 ~ ${age.to}세`)
                      .join(", ")
                  : "-"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                타겟팅 요청 사항:
              </span>
              <p className="text-gray-900">{formData.targetOther}</p>
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
                {formData.viewAssets.detailSubtitle || "-"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">CTA:</span>
              <p className="text-gray-900">
                {formData.viewAssets.callToAction || "-"}
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
