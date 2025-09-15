"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { MENU_ITEMS } from "@/constants/navData";
import { useActiveRoute } from "@/hooks/useActiveRoute";

const Navbar = () => {
  const { isActive } = useActiveRoute();

  return (
    <header className="bg-background fixed z-[var(--navbar-z-index)] flex h-16 w-full items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        {/* 모바일 메뉴 버튼 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader>
              <SheetTitle>광고 관리 시스템</SheetTitle>
            </SheetHeader>
            <div className="mt-12 grid flex-1 gap-6 px-4">
              <SidebarMenu>
                {MENU_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)}>
                      <a href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SheetContent>
        </Sheet>
        {/* 데스크톱 사이드바 토글 */}
        <SidebarTrigger
          className={`
            hidden
            md:flex
          `}
        />
      </div>
    </header>
  );
};

export default Navbar;
