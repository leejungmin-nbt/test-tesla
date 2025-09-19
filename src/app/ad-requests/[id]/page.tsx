"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adRequestDetailQueryOptions,
  adRequestKeys,
  approveAdRequestMutationOptions,
} from "@/lib/features/adRequests";
import {
  getAdvertiserName,
  getCategoryName,
  getAdTypeName,
  getRepeatParticipateTypeName,
  getHelpRequestPersonalInfoTypeNames,
  getReportTypeName,
  getAdActionTypeName,
  getOsNames,
  getGenderNames,
  getAdisonModeName,
} from "@/utils/dataMapping";
import { AD_REQUEST_STATUS } from "@/constants/adRequest";
import { formatDate } from "@/utils/date";
import { toast } from "sonner";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";

const AdRequestDetailPage = () => {
  const { id: idParam } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, isLoading } = useQuery({
    ...adRequestDetailQueryOptions(String(idParam)),
  });

  const { mutate: approveAdRequest, isPending: isApproveAdRequestPending } =
    useMutation({
      ...approveAdRequestMutationOptions(),
    });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!data) {
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

  const { name, content, status, createdAt, updatedAt } = data;

  const getStatusColor = (status: number) => {
    const statusData = AD_REQUEST_STATUS.find((item) => item.id === status);

    switch (statusData?.name) {
      case "검수중":
        return "bg-orange-100 text-orange-800";
      case "검수완료":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApproveAdRequest = () => {
    approveAdRequest(String(idParam), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: adRequestKeys.detail(String(idParam)),
        });
        router.refresh();
        toast.success("광고 요청이 검수 완료되었습니다!");
      },
      onError: () => {
        toast.error("광고 요청 검수 완료에 실패했습니다.");
      },
    });
    setIsOpenModal(false);
  };

  return (
    <>
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
                <h1 className="mb-2 text-3xl font-bold">{name}</h1>
              </div>
              <Badge
                className={`
                  px-3 py-1
                  ${getStatusColor(status)}
                `}
              >
                {AD_REQUEST_STATUS.find((item) => item.id === status)?.name}
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
                    <p className="text-sm">{content.brand}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      거래처
                    </label>
                    <p className="text-sm">{content.adVendor}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      광고주
                    </label>
                    <p className="text-sm">
                      {getAdvertiserName(content.advertiserId.toString())}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      카테고리
                    </label>
                    <p className="text-sm">
                      {getCategoryName(content.categoryId.toString())}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      리포트 타입
                    </label>
                    <p className="text-sm">
                      {getReportTypeName(content.reportType.toString())}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      재참여 타입
                    </label>
                    <p className="text-sm">
                      {getRepeatParticipateTypeName(
                        content.repeatParticipateTypeId.toString()
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
                      content.helpRequestPersonalInfoTypeIds.map((id) =>
                        id.toString()
                      )
                    ).map((name, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
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
                    {content.advertiserCsManagerNames || "미지정"}
                  </p>
                </div>

                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    이메일
                  </label>
                  <p className="text-sm">{content.advertiserCsManagerEmails}</p>
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
                      {getAdTypeName(content.adTypeId.toString())}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      액션 타입
                    </label>
                    <p className="text-sm">
                      {getAdActionTypeName(content.adActionTypeId.toString())}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      시작일
                    </label>
                    <p className="text-sm">{formatDate(content.startAt)}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      종료일
                    </label>
                    <p className="text-sm">{formatDate(content.endAt)}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      단가
                    </label>
                    <p className="text-sm">
                      {Number(content.cost).toLocaleString()}원
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      일일 물량
                    </label>
                    <p className="text-sm">
                      {Number(content.dailyActionCap).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Separator />
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    애디슨 매체 집행 방식
                  </label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {getAdisonModeName(
                      content.targetAdisonPublisherIds.mode.map((mode) =>
                        mode.toString()
                      )
                    ).map((mode, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    타겟 OS
                  </label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {getOsNames(
                      content.targetOs.map((os) => os.toString())
                    ).map((os, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {os}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    집행 시간
                  </label>
                  <div className="text-sm">
                    {content.targetTimes && content.targetTimes.length > 0 ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {content.targetTimes.map(
                          (
                            timeRange: { from: string; to: string },
                            index: number
                          ) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Badge variant="outline" className="text-xs">
                                {timeRange.from && timeRange.to
                                  ? `${timeRange.from} ~ ${timeRange.to}`
                                  : "시간 미설정"}
                              </Badge>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        설정된 시간 없음
                      </span>
                    )}
                  </div>
                </div>

                {content.targetGenders && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      타겟 성별
                    </label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {getGenderNames(
                        content.targetGenders.map((gender) => gender.toString())
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

                {content.targetAges && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      타겟 연령
                    </label>
                    <p className="text-sm">
                      {content.targetAges && content.targetAges.length > 0
                        ? content.targetAges.map((age, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {age.from}세 ~ {age.to}세
                            </Badge>
                          ))
                        : "-"}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    타겟팅 요청 사항
                  </label>
                  <p className="rounded-md bg-gray-50 p-3 text-sm">
                    {content.targetOther}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* 랜딩 URL 정보 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                랜딩 주소
              </CardTitle>
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
                  <p className="text-sm break-all">
                    {content.landingUrl.default || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    Android URL
                  </label>
                  <p className="text-sm break-all">
                    {content.landingUrl.android || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    iOS URL
                  </label>
                  <p className="text-sm break-all">
                    {content.landingUrl.ios || "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* 광고 자산 정보 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                광고 에셋
              </CardTitle>
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
                      {content.viewAssets.title}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      부제목
                    </label>
                    <p className="text-sm">{content.viewAssets.subtitle}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      상세 타이틀
                    </label>
                    <p className="text-sm">{content.viewAssets.detailTitle}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      상세 부제목
                    </label>
                    <p className="text-sm">
                      {content.viewAssets.detailSubtitle || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      CTA
                    </label>
                    <p className="text-sm">
                      {content.viewAssets.callToAction || "-"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      피드 썸네일
                    </label>
                    <p className="text-sm break-all text-blue-600">
                      {content.viewAssets.thumbnailFeed}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      아이콘
                    </label>
                    <p className="text-sm break-all text-blue-600">
                      {content.viewAssets.thumbnailIcon}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      상세 이미지
                    </label>
                    <p className="text-sm break-all text-blue-600">
                      {content.viewAssets.detailImage}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      안내사항
                    </label>
                    <p className="rounded-md bg-gray-50 p-3 text-sm">
                      {content.viewAssets.notice}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* 액션 버튼 */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/ad-requests")}
            >
              목록으로
            </Button>
            {status === 1 && (
              <>
                <Button variant="outline">수정하기</Button>
                <Button onClick={() => setIsOpenModal(true)}>검수 완료</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={handleApproveAdRequest}
        onCancel={() => setIsOpenModal(false)}
        title="광고 요청 검수 완료"
        description="검수를 완료하면 되돌릴 수 없습니다. 검수를 완료하시겠습니까?"
        cancelText="취소"
        confirmText="검수 완료"
        disabled={isApproveAdRequestPending}
        size="sm"
      />
    </>
  );
};

export default AdRequestDetailPage;
