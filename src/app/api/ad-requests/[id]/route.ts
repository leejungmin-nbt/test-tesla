import { NextRequest, NextResponse } from "next/server";
import { createResponse, createErrorResponse } from "@/lib/api/common/response";
import { serverApi } from "@/lib/api/server";

// GET: 광고 요청 상세 조회
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;

    const { data: response } = await serverApi.get(
      `/api/v1/ad-requests/${idParam}`
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
        message: "광고 요청 상세 정보를 가져오는데 실패했습니다.",
        status: 500,
        code: "INTERNAL_SERVER_ERROR",
      }),
      { status: 500 }
    );
  }
}
