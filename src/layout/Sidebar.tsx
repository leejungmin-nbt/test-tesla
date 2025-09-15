"use client";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText } from "lucide-react";
import { MENU_ITEMS } from "@/constants/navData";
import { useActiveRoute } from "@/hooks/useActiveRoute";

const Sidebar = () => {
  const { isActive } = useActiveRoute();

  return (
    <SidebarComponent className="border-r">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            <FileText className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">광고 관리 시스템</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-4">
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
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
