import { NextRequest, NextResponse } from "next/server";
import { createResponse, createErrorResponse } from "@/lib/api/common/response";
import { serverApi } from "@/lib/api/server";
import { CreateAdRequestRequest } from "@/types/adRequests";

// GET: 광고 요청 목록 조회
export async function GET() {
  try {
    const { data: response } = await serverApi.get("/api/v1/ad-requests");

    const { data, result } = response;

    return NextResponse.json(
      createResponse({
        data,
        result,
      })
    );
  } catch {
    return NextResponse.json(
      createErrorResponse({
        message: "광고 요청 목록을 가져오는데 실패했습니다.",
        status: 500,
        code: "INTERNAL_SERVER_ERROR",
      }),
      { status: 500 }
    );
  }
}

// POST: 광고 요청 생성
export async function POST(req: NextRequest) {
  try {
    const formData: CreateAdRequestRequest = await req.json();

    const { data: response } = await serverApi.post("/api/v1/ad-requests", {
      name: formData.title,
      targets: [1],
      content: formData,
      memo: "",
    });

    return NextResponse.json(
      createResponse({
        data: response.data,
        result: response.result,
      })
    );
  } catch (error) {
    console.error("POST /api/ad-requests error:", error);
    return NextResponse.json(
      createErrorResponse({
        message: "광고 요청 등록에 실패했습니다.",
        status: 500,
        code: "INTERNAL_SERVER_ERROR",
      }),
      { status: 500 }
    );
  }
}
