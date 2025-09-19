"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { clearAllLocalStorage } from "@/utils/localStorage";
import { toast } from "sonner";

export default function Home() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleErrorButton = () => {
    setShouldThrowError(true);
  };

  const handleClearStorage = () => {
    if (
      confirm(
        "모든 localStorage 데이터를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다."
      )
    ) {
      clearAllLocalStorage();
      toast.success("localStorage가 성공적으로 초기화되었습니다!");
    }
  };

  if (shouldThrowError) {
    throw new Error("테스트 에러입니다.");
  }

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
            <p className="text-primary text-2xl font-bold">24</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">진행 중</h3>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">완료</h3>
            <p className="text-2xl font-bold text-green-600">16</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-semibold">최근 활동 (예시 영역)</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded border p-3">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>새로운 광고 요청이 등록되었습니다.</span>
            <span className="text-muted-foreground ml-auto text-sm">
              2시간 전
            </span>
          </div>
          <div className="flex items-center gap-3 rounded border p-3">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>광고 요청 #001이 승인되었습니다.</span>
            <span className="text-muted-foreground ml-auto text-sm">
              5시간 전
            </span>
          </div>
          <div className="flex items-center gap-3 rounded border p-3">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <span>광고 요청 #002가 검토 중입니다.</span>
            <span className="text-muted-foreground ml-auto text-sm">
              1일 전
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-semibold">시스템 테스트</h3>
        <p className="text-muted-foreground mb-4">
          에러 페이지 테스트를 위한 버튼입니다.
        </p>
        <div className="flex gap-3">
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

      <div className="bg-card rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-semibold">데이터 관리</h3>
        <p className="text-muted-foreground mb-4">
          테스트용 사이트에서 로직이 변경될 때 사용자들의 localStorage를
          초기화할 수 있습니다.
        </p>
        <Button
          onClick={handleClearStorage}
          variant="outline"
          className={`
            border-orange-500 text-orange-600
            hover:border-orange-600 hover:bg-orange-50
          `}
        >
          localStorage 초기화
        </Button>
      </div>
    </div>
  );
}
