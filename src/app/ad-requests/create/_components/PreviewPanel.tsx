"use client";

import Image from "next/image";
import { AdRequestCreateFormType } from "@/schema/adRequestCreate.schema";

interface PreviewPanelProps {
  watchedData: AdRequestCreateFormType;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ watchedData }) => {
  return (
    <div className="bg-background sticky top-6 max-h-[calc(100vh-150px)] w-full space-y-4 overflow-y-auto rounded-lg border p-6">
      <h3 className="text-lg font-semibold">광고 미리보기</h3>

      {/* 리스트형 광고 카드 미리보기 */}
      <div className="space-y-4">
        <div className="text-muted-foreground text-sm">리스트형 광고 카드</div>

        {/* 리스트형 광고 카드 */}
        <div className="mx-auto max-w-sm rounded-lg border bg-white shadow-sm">
          {/* 메인 이미지 영역 */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
            {/* {watchedData.viewAssets?.thumbnailFeed ? (
              <Image
                src={watchedData.viewAssets.thumbnailFeed}
                alt="광고 썸네일"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <div className="mb-2 text-4xl">🎯</div>
                  <div className="text-sm text-gray-500">광고 이미지</div>
                </div>
              </div>
            )} */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="text-sm text-gray-500">광고 이미지</div>
              </div>
            </div>
          </div>

          {/* 하단 정보 바 */}
          <div className="flex items-center justify-between bg-white p-4">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {watchedData.viewAssets?.title || "{제목}"}
              </div>
              <div className="text-xs text-gray-600">
                {watchedData.viewAssets?.subtitle || "{부제목}"}
              </div>
            </div>
            <button
              className={`
                ml-4 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white
                hover:bg-green-600
              `}
            >
              {watchedData.viewAssets?.callToAction || "{액션 버튼 문구}"}
            </button>
          </div>
        </div>
      </div>

      {/* 상세 화면 미리보기 */}
      <div className="space-y-4">
        <div className="text-muted-foreground text-sm">상세 화면</div>

        <div className="mx-auto max-w-sm rounded-lg border bg-white shadow-sm">
          {/* 상단 네비게이션 */}
          <div className="flex items-center border-b bg-white p-4">
            <div className="mr-3 text-xl">←</div>
            <div className="text-sm font-medium">
              {watchedData.viewAssets?.navigationTitle || "{상세 타이틀 바}"}
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="bg-white p-4">
            {/* 로고와 제목 */}
            {/* <div className="mb-6 text-center">
              <div className="mb-2 text-2xl font-bold text-purple-600">
                {watchedData.brand || "AZISON"}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {watchedData.viewAssets?.title || "테스트 중인 캠페인입니다."}
              </div>
            </div> */}

            {/* 메인 일러스트레이션 영역 */}
            <div className="mb-6 flex justify-center">
              <div className="relative h-100 w-full rounded-lg bg-gray-50 p-4">
                {/* {watchedData.viewAssets?.detailImage ? (
                  <Image
                    src={watchedData.viewAssets.detailImage}
                    alt="상세 이미지"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <div className="mb-2 text-4xl">🎨</div>
                      <div className="text-sm text-gray-500">
                        캠페인 일러스트
                      </div>
                    </div>
                  </div>
                )} */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">캠페인 일러스트</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 리워드 정보 */}
            <div className="mb-4 text-left">
              <div className="mb-2 text-lg font-bold">
                {watchedData.viewAssets?.detailTitle || "{상세 타이틀}"}
              </div>
              <div className="text-lg font-bold">
                {watchedData.viewAssets?.detailSubtitle || "{상세 서브 타이틀}"}
              </div>
            </div>

            {/* 참여 버튼 */}
            <button
              className={`
                mb-6 w-full rounded-lg bg-green-500 py-3 text-base font-medium text-white
                hover:bg-green-600
              `}
            >
              {watchedData.viewAssets?.callToAction || "{액션 버튼 문구}"}
            </button>

            {/* 상세 안내 */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700">
                {watchedData.viewAssets?.detailSubtitle || "{상세 안내 문구}"}
              </div>
              <div className="text-sm text-gray-600">
                <div className="mb-2 font-medium">상세 안내</div>
                <ul className="space-y-1 text-xs">
                  <li>
                    • 이벤트 참여 완료 시 시리즈 쿠키가 지급되며, MY &gt;
                    쿠키샵에서 지급 여부를 확인 할 수 있습니다.
                  </li>
                  <li>• 쿠키 사용 유효기간은 지급 시점으로부터 7일입니다.</li>
                  <li>
                    • 지급받은 쿠키는 이벤트 참여를 완료한 휴대폰의 OS에 따라
                    사용할 수 있는 플랫폼이 제한됩니다.
                  </li>
                  <li>
                    • (예: iOS앱에서 이벤트 참여를 완료하신 경우, iOS전용 쿠키로
                    지급됩니다.)
                  </li>
                  <li>
                    • 네트워크 장애 발생 시, 이벤트 참여 후 쿠키 지급까지 시간이
                    다소 지연될 수 있습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 미리보기 안내 */}
      <div className="rounded-lg bg-blue-50 p-4">
        <div className="text-sm text-blue-800">
          <div className="mb-1 font-medium">미리보기 안내</div>
          <div className="text-xs">
            해당 화면은 입력하신 데이터에 따라 유저에게 실제로 보여지는 광고
            화면을 예시로 나타낸 것으로 참고용으로 사용해주세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
