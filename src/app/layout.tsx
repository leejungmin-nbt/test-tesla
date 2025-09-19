import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { MainLayout } from "@/layout";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "Helvetica Neue",
    "Segoe UI",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "Adison Tesla Web",
  description: "Advertising registration simplification project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`
          ${pretendard.variable}
          antialiased
        `}
      >
        <ReactQueryProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
