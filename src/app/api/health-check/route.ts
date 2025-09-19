import { NextResponse } from "next/server";

// GET: 헬스체크
export async function GET() {
  return NextResponse.json("API Ok");
}
