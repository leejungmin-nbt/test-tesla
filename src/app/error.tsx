"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error("오류 >> ", error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-destructive/10 rounded-full p-6">
            <AlertTriangle className="text-destructive h-12 w-12" />
          </div>
        </div>

        <div className="mb-8 space-y-3">
          <h1 className="text-foreground text-3xl font-bold">
            오류가 발생했습니다
          </h1>
          <p className="text-muted-foreground">
            예상치 못한 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="bg-muted mb-6 rounded-lg p-4 text-left">
            <details className="text-sm">
              <summary className="text-muted-foreground mb-2 cursor-pointer font-medium">
                오류 세부 정보
              </summary>
              <pre className="text-destructive text-xs whitespace-pre-wrap">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-muted-foreground mt-2 text-xs">
                  Digest: {error.digest}
                </p>
              )}
            </details>
          </div>
        )}
        <div
          className={`
            flex flex-col gap-3
            sm:flex-row sm:justify-center
          `}
        >
          <Button
            onClick={reset}
            variant="default"
            className={`
              w-full
              sm:w-auto
            `}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>

          <Button
            variant="outline"
            className={`
              w-full
              sm:w-auto
            `}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Home className="mr-2 h-4 w-4" />
            홈으로 이동
          </Button>
        </div>
        <div className="text-muted-foreground mt-8 text-sm">
          문제가 계속 발생하면{" "}
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
          에 도움을 요청해 주세요.
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
