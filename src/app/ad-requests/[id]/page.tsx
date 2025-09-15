"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import {
  getAdRequestById,
  updateAdRequestStatus,
  type StoredAdRequest,
} from "@/utils/localStorage";
import { toast } from "sonner";
import { Modal } from "@/components/common/Modal";
import {
  getAdvertiserName,
  getCategoryName,
  getAdTypeName,
  getRepeatParticipateTypeName,
  getHelpRequestPersonalInfoTypeNames,
  getReportTypeName,
  getAdActionTypeName,
  getTargetOsNames,
  getTargetGenderNames,
  getAdisonPublisherModeNames,
} from "@/utils/dataMapping";

const AdRequestDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [adRequest, setAdRequest] = useState<StoredAdRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  useEffect(() => {
    // 로컬스토리지에서 데이터 로드
    const fetchAdRequest = async () => {
      setLoading(true);
      // 실제로는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundRequest = getAdRequestById(Number(id));
      setAdRequest(foundRequest || null);
      setLoading(false);
    };

    fetchAdRequest();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "검수중":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "검수완료":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // 수정하기 버튼 클릭 핸들러
  const handleEditClick = () => {
    toast.info("현재 구현되지 않은 기능입니다.");
  };

  // 검수 완료 버튼 클릭 핸들러
  const handleApprovalClick = () => {
    setShowApprovalModal(true);
  };

  // 검수 완료 확인 핸들러
  const handleConfirmApproval = () => {
    if (adRequest) {
      updateAdRequestStatus(adRequest.id, "검수완료");
      setAdRequest({ ...adRequest, status: "검수완료" });
      setShowApprovalModal(false);
      toast.success("검수가 완료되었습니다!");
    }
  };

  // 검수 완료 취소 핸들러
  const handleCancelApproval = () => {
    setShowApprovalModal(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!adRequest) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-semibold">
            광고 요청을 찾을 수 없습니다
          </h1>
          <p className="text-muted-foreground mb-4">
            요청하신 광고 요청이 존재하지 않습니다.
          </p>
          <Button onClick={() => router.push("/ad-requests")}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        {/* 헤더 */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/ad-requests")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{adRequest.title}</h1>
              {/* <div className="text-muted-foreground flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {adRequest.company}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {adRequest.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {adRequest.budget}
                </span>
              </div> */}
            </div>
            <Badge
              className={`
                px-3 py-1
                ${getStatusColor(adRequest.status)}
              `}
            >
              {adRequest.status}
            </Badge>
          </div>
        </div>

        <div
          className={`
            grid grid-cols-1 gap-6
            lg:grid-cols-2
          `}
        >
          {/* 캠페인 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                캠페인 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    브랜드
                  </label>
                  <p className="text-sm">{adRequest.formData.brand}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    거래처
                  </label>
                  <p className="text-sm">{adRequest.formData.adVendor}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    광고주
                  </label>
                  <p className="text-sm">
                    {getAdvertiserName(adRequest.formData.advertiserId)}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    카테고리
                  </label>
                  <p className="text-sm">
                    {getCategoryName(adRequest.formData.categoryId)}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    리포트 타입
                  </label>
                  <p className="text-sm">
                    {getReportTypeName(adRequest.formData.reportType)}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    재참여 타입
                  </label>
                  <p className="text-sm">
                    {getRepeatParticipateTypeName(
                      adRequest.formData.repeatParticipateTypeId
                    )}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  개인정보 수집 항목
                </label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {getHelpRequestPersonalInfoTypeNames(
                    adRequest.formData.helpRequestPersonalInfoTypeIds
                  ).map((name, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  CS 담당자
                </label>
                <p className="text-sm">
                  {adRequest.formData.advertiserCsManagerNames || "미지정"}
                </p>
              </div>

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  이메일
                </label>
                <p className="text-sm">
                  {adRequest.formData.advertiserCsManagerEmails}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 광고 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                광고 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    광고 타입
                  </label>
                  <p className="text-sm">
                    {getAdTypeName(adRequest.formData.adTypeId)}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    액션 타입
                  </label>
                  <p className="text-sm">
                    {getAdActionTypeName(adRequest.formData.adActionTypeId)}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    시작일
                  </label>
                  <p className="text-sm">{adRequest.formData.startAt}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    종료일
                  </label>
                  <p className="text-sm">{adRequest.formData.endAt}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    단가
                  </label>
                  <p className="text-sm">
                    {Number(adRequest.formData.cost).toLocaleString()}원
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    일일 물량
                  </label>
                  <p className="text-sm">{adRequest.formData.dailyActionCap}</p>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  타겟 OS
                </label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {getTargetOsNames(adRequest.formData.targetOs).map(
                    (os, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {os}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  집행 시간
                </label>
                <p className="text-sm">
                  {adRequest.formData.targetTimes.from} ~{" "}
                  {adRequest.formData.targetTimes.to}
                </p>
              </div>

              {adRequest.formData.targetGenders &&
                adRequest.formData.targetGenders.length > 0 && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      타겟 성별
                    </label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {getTargetGenderNames(
                        adRequest.formData.targetGenders
                      ).map((gender, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {gender}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {adRequest.formData.targetAges && (
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    타겟 연령
                  </label>
                  <p className="text-sm">
                    {adRequest.formData.targetAges.from}세 ~{" "}
                    {adRequest.formData.targetAges.to}세
                  </p>
                </div>
              )}

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  애디슨 매체 집행 방식
                </label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {getAdisonPublisherModeNames(
                    adRequest.formData.targetAdisonPublisherIds.mode
                  ).map((mode, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {mode}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 랜딩 URL 정보 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">랜딩 주소</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`
                grid grid-cols-1 gap-4
                md:grid-cols-3
              `}
            >
              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  기본 URL
                </label>
                {adRequest.formData.landingUrl.default ? (
                  <p
                    className={`
                      cursor-pointer text-sm break-all text-blue-600
                      hover:text-blue-800 hover:underline
                    `}
                    onClick={() =>
                      window.open(
                        adRequest.formData.landingUrl.default,
                        "_blank"
                      )
                    }
                  >
                    {adRequest.formData.landingUrl.default}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">-</p>
                )}
              </div>
              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Android URL
                </label>
                {adRequest.formData.landingUrl.android ? (
                  <p
                    className={`
                      cursor-pointer text-sm break-all text-blue-600
                      hover:text-blue-800 hover:underline
                    `}
                    onClick={() =>
                      window.open(
                        adRequest.formData.landingUrl.android,
                        "_blank"
                      )
                    }
                  >
                    {adRequest.formData.landingUrl.android}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">-</p>
                )}
              </div>
              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  iOS URL
                </label>
                {adRequest.formData.landingUrl.ios ? (
                  <p
                    className={`
                      cursor-pointer text-sm break-all text-blue-600
                      hover:text-blue-800 hover:underline
                    `}
                    onClick={() =>
                      window.open(adRequest.formData.landingUrl.ios, "_blank")
                    }
                  >
                    {adRequest.formData.landingUrl.ios}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">-</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 광고 자산 정보 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">광고 에셋</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`
                grid grid-cols-1 gap-6
                md:grid-cols-2
              `}
            >
              <div className="space-y-4">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    제목
                  </label>
                  <p className="text-sm font-medium">
                    {adRequest.formData.viewAssets.title}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    부제목
                  </label>
                  <p className="text-sm">
                    {adRequest.formData.viewAssets.subtitle}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    상세 타이틀
                  </label>
                  <p className="text-sm">
                    {adRequest.formData.viewAssets.detailTitle}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    상세 부제목
                  </label>
                  <p className="text-sm">
                    {adRequest.formData.viewAssets.detailSubtitle}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    CTA
                  </label>
                  <p className="text-sm">
                    {adRequest.formData.viewAssets.callToAction}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    피드 썸네일
                  </label>
                  <p className="text-sm break-all text-blue-600">
                    {adRequest.formData.viewAssets.thumbnailFeed}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    아이콘
                  </label>
                  <p className="text-sm break-all text-blue-600">
                    {adRequest.formData.viewAssets.thumbnailIcon}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    상세 이미지
                  </label>
                  <p className="text-sm break-all text-blue-600">
                    {adRequest.formData.viewAssets.detailImage}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    안내사항
                  </label>
                  <p className="rounded-md bg-gray-50 p-3 text-sm">
                    {adRequest.formData.viewAssets.notice}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.push("/ad-requests")}>
            목록으로
          </Button>
          {adRequest.status === "검수중" && (
            <>
              <Button variant="outline" onClick={handleEditClick}>
                수정하기
              </Button>
              <Button onClick={handleApprovalClick}>검수 완료</Button>
            </>
          )}
        </div>
      </div>

      {/* 검수 완료 확인 모달 */}
      <Modal
        isOpen={showApprovalModal}
        onClose={handleCancelApproval}
        onConfirm={handleConfirmApproval}
        title="검수 완료 확인"
        description="검수를 완료하시겠습니까?"
        cancelText="취소"
        confirmText="확인"
        size="sm"
      />
    </div>
  );
};

export default AdRequestDetailPage;
