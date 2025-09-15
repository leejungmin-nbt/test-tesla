"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/DataTable";
import type { DataTableColumn } from "@/components/ui/DataTable";
import { getAdRequests, type StoredAdRequest } from "@/utils/localStorage";

type StatusType = "전체" | "검수중" | "검수완료";

const AdRequestsPage = () => {
  const [activeFilter, setActiveFilter] = useState<StatusType>("전체");
  const [adRequests, setAdRequests] = useState<StoredAdRequest[]>([]);
  const router = useRouter();

  // 로컬스토리지에서 데이터 로드
  useEffect(() => {
    const requests = getAdRequests();
    setAdRequests(requests);
  }, []);

  // 필터링된 데이터 (ID가 높은 순으로 정렬 - 최신 순)
  const filteredRequests = adRequests
    .filter((request) => {
      if (activeFilter === "전체") return true;
      return request.status === activeFilter;
    })
    .sort((a, b) => b.id - a.id); // ID가 높은 순으로 정렬 (최신 순)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "검수중":
        return "bg-orange-100 text-orange-800";
      case "검수완료":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 필터 버튼 데이터
  const filterOptions: StatusType[] = ["전체", "검수중", "검수완료"];

  // 각 상태별 개수 계산
  const getStatusCount = (status: StatusType) => {
    if (status === "전체") {
      return adRequests.length;
    }

    return adRequests.filter((request) => request.status === status).length;
  };

  const columns: DataTableColumn<StoredAdRequest>[] = [
    {
      key: "title",
      title: "제목",
      render: (value) => <div className="font-medium">{String(value)}</div>,
    },
    {
      key: "company",
      title: "회사",
      render: (value) => (
        <span className="text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      key: "budget",
      title: "예산",
      align: "right",
      render: (value) => (
        <span className="text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      key: "status",
      title: "상태",
      align: "center",
      render: (value) => (
        <span
          className={`
            rounded-full px-2 py-1 text-xs font-medium
            ${getStatusColor(String(value))}
          `}
        >
          {String(value)}
        </span>
      ),
    },
    {
      key: "createdAt",
      title: "등록일",
      render: (value) => (
        <span className="text-muted-foreground">{String(value)}</span>
      ),
    },
  ];

  // 로우 클릭 핸들러
  const handleRowClick = (record: StoredAdRequest) => {
    router.push(`/ad-requests/${record.id}`);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">광고 요청 목록</h2>
          <p className="text-muted-foreground">
            등록된 광고 요청을 관리하고 추적하세요.
          </p>
        </div>
        <Button asChild>
          <Link href="/ad-requests/create">
            <Plus className="mr-2 h-4 w-4" />새 요청 등록
          </Link>
        </Button>
      </div>

      {/* 필터 영역 */}
      <div className="bg-muted/30 flex items-center gap-2 rounded-lg border p-4">
        <span className="text-muted-foreground mr-2 text-sm font-medium">
          상태별 필터:
        </span>
        {filterOptions.map((option) => (
          <Button
            key={option}
            variant={activeFilter === option ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(option)}
            className="transition-all"
          >
            {option}
            <span className="bg-background/20 ml-2 rounded-full px-1.5 py-0.5 text-xs">
              {getStatusCount(option)}
            </span>
          </Button>
        ))}
      </div>

      {/* 테이블 */}
      <DataTable
        data={filteredRequests}
        columns={columns}
        onRowClick={handleRowClick}
        emptyMessage={`${activeFilter} 상태의 광고 요청이 없습니다.`}
        totalCount={adRequests.length}
        // loading={true}
      />
    </div>
  );
};

export default AdRequestsPage;
