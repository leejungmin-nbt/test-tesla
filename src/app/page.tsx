"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAdRequests, type StoredAdRequest } from "@/utils/localStorage";
import Link from "next/link";

export default function Home() {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [adRequests, setAdRequests] = useState<StoredAdRequest[]>([]);

  // 광고 요청 데이터 로드
  useEffect(() => {
    const requests = getAdRequests();
    setAdRequests(requests);
  }, []);

  const handleErrorButton = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error("테스트 에러입니다.");
  }

  // 통계 계산
  const totalRequests = adRequests.length;
  const inProgressRequests = adRequests.filter(
    (req) => req.status === "검수중"
  ).length;
  const completedRequests = adRequests.filter(
    (req) => req.status === "검수완료"
  ).length;

  // 최근 활동 (최신 5개, ID가 높은 순)
  const recentRequests = adRequests.sort((a, b) => b.id - a.id).slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "검수중":
        return "bg-orange-500";
      case "검수완료":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "검수중":
        return "검토 중";
      case "검수완료":
        return "승인됨";
      default:
        return "등록됨";
    }
  };

  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInHours = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Adison Tesla 광고 관리 시스템 (가제)
        </h2>
        <p className="text-muted-foreground mb-6">
          광고 요청을 효율적으로 등록하고 관리할 수 있는 시스템입니다.
        </p>
        <div
          className={`
            grid gap-4
            md:grid-cols-3
          `}
        >
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">총 광고 요청</h3>
            <p className="text-primary text-2xl font-bold">{totalRequests}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">진행 중</h3>
            <p className="text-2xl font-bold text-blue-600">
              {inProgressRequests}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">완료</h3>
            <p className="text-2xl font-bold text-green-600">
              {completedRequests}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">최근 활동</h3>
          <Button asChild variant="outline" size="sm">
            <Link href="/ad-requests">전체 보기</Link>
          </Button>
        </div>
        <div className="space-y-3">
          {recentRequests.length > 0 ? (
            recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center gap-3 rounded border p-3"
              >
                <div
                  className={`
                    h-2 w-2 rounded-full
                    ${getStatusColor(request.status)}
                  `}
                ></div>
                <div className="flex-1">
                  <span className="font-medium">{request.title}</span>
                  <span className="text-muted-foreground ml-2">
                    ({request.company}) - {getStatusText(request.status)}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  {formatTimeAgo(request.createdAt)}
                </span>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground py-8 text-center">
              <p>등록된 광고 요청이 없습니다.</p>
              <Button asChild className="mt-2" size="sm">
                <Link href="/ad-requests/create">새 요청 등록하기</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-semibold">시스템 테스트</h3>
        <p className="text-muted-foreground mb-4">
          에러 페이지 테스트를 위한 버튼입니다.
        </p>
        <Button
          onClick={handleErrorButton}
          variant="destructive"
          className={`
            bg-red-600
            hover:bg-red-700
          `}
        >
          에러 발생시키기
        </Button>
      </div>
    </div>
  );
}
