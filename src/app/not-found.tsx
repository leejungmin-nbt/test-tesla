"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-primary/20 text-9xl leading-none font-bold">
            404
          </h1>
        </div>
        <div className="mb-8 space-y-3">
          <h2 className="text-foreground text-2xl font-semibold">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-muted-foreground">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            URL을 다시 확인해 주세요.
          </p>
        </div>
        <div
          className={`
            flex flex-col gap-3
            sm:flex-row sm:justify-center
          `}
        >
          <Button
            asChild
            variant="default"
            className={`
              w-full
              sm:w-auto
            `}
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              홈으로 이동
            </Link>
          </Button>

          <Button
            variant="outline"
            className={`
              w-full
              sm:w-auto
            `}
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전 페이지
          </Button>
        </div>
        <div className="text-muted-foreground mt-8 text-sm">
          문제가 지속되면{" "}
          <Link
            href="https://nbtguild.slack.com/archives/CRSFHUZPZ"
            className={`
              text-primary font-medium
              hover:underline
            `}
            target="_blank"
            rel="noopener noreferrer"
          >
            O파티
          </Link>
          에 문의해 주세요.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
