"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/DataTable";
import type { DataTableColumn } from "@/components/ui/DataTable";
import { useQuery } from "@tanstack/react-query";
import { adRequestsQueryOptions } from "@/lib/features/adRequests";
import { AdRequest } from "@/types/adRequests";
import { AD_REQUEST_STATUS } from "@/constants/adRequest";
import { formatDate } from "@/utils/date";

const AdRequestsPage = () => {
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    ...adRequestsQueryOptions(),
  });

  const adRequestsData = data?.sort((a, b) => b.id - a.id) || [];

  const filteredRequests = adRequestsData.filter((request: AdRequest) => {
    if (activeFilter === 0) {
      return true;
    }

    return request.status === activeFilter;
  });

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

  const getStatusCount = (status: number) => {
    if (status === 0) {
      return adRequestsData.length;
    }

    return adRequestsData.filter(
      (request: AdRequest) => request.status === status
    ).length;
  };

  const columns: DataTableColumn<AdRequest>[] = [
    {
      key: "name",
      title: "제목",
      render: (value) => <div className="font-medium">{String(value)}</div>,
    },
    {
      key: "status",
      title: "상태",
      align: "center",
      render: (value) => (
        <span
          className={`
            rounded-full px-2 py-1 text-xs font-medium
            ${getStatusColor(Number(value))}
          `}
        >
          {AD_REQUEST_STATUS.find((item) => item.id === Number(value))?.name}
        </span>
      ),
    },
    {
      key: "createdAt",
      title: "등록일",
      render: (value) => (
        <span className="text-muted-foreground">
          {formatDate(value as string)}
        </span>
      ),
    },
  ];

  const handleRowClick = (record: AdRequest) => {
    router.push(`/ad-requests/${record.id}`);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">광고 요청 목록 (예시 화면)</h2>
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
        {AD_REQUEST_STATUS.map((option) => (
          <Button
            key={option.id}
            variant={activeFilter === option.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(option.id)}
            className="transition-all"
          >
            {option.name}
            <span className="bg-background/20 ml-2 rounded-full px-1.5 py-0.5 text-xs">
              {getStatusCount(option.id)}
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
        totalCount={adRequestsData.length}
        loading={isLoading}
      />
    </div>
  );
};

export default AdRequestsPage;
