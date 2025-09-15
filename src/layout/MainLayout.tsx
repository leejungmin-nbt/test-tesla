"use client";

import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar, Navbar } from "@/layout";
import { ScrollToTop } from "@/components/common";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* 사이드바 */}
        <Sidebar />
        {/* 메인 콘텐츠 영역 */}
        <SidebarInset className="flex flex-1 flex-col">
          {/* 상단 네비게이션 */}
          <Navbar />
          {/* 메인 콘텐츠 */}
          <main className="mt-16 flex-1 overflow-auto p-6">
            <div className="mx-auto">{children}</div>
          </main>
        </SidebarInset>
      </div>
      <ScrollToTop />
    </SidebarProvider>
  );
};

export default MainLayout;
