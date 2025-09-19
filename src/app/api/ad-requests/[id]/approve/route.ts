import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server";
import { createErrorResponse, createResponse } from "@/lib/api/common/response";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: response } = await serverApi.post(
      `/api/v1/ad-requests/${id}/approve`
    );

    return NextResponse.json(
      createResponse({
        data: response.data,
        result: response.result,
      })
    );
  } catch {
    return NextResponse.json(
      createErrorResponse({
        message: "광고 요청 검수 상태 변경에 실패했습니다.",
        status: 500,
        code: "INTERNAL_SERVER_ERROR",
      }),
      { status: 500 }
    );
  }
}
