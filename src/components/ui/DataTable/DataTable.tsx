"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import type { DataTableProps, DataTableAction } from "./types";
import Link from "next/link";

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  actions = [],
  totalCount,
  loading = false,
  emptyMessage = "데이터가 없습니다.",
  className,
  onRowClick,
  rowClassName,
}: DataTableProps<T>) {
  const renderActionButton = (
    action: DataTableAction<T>,
    record: T,
    index: number
  ) => {
    if (action.hidden?.(record)) return null;

    const buttonProps = {
      variant: action.variant || "ghost",
      size: action.size || "sm",
      disabled: action.disabled?.(record),
      className: "transition-colors",
    };

    const buttonContent = (
      <>
        {action.icon && <action.icon className="h-4 w-4" />}
        {action.size !== "icon" && action.label && (
          <span className={action.icon ? "ml-1" : ""}>{action.label}</span>
        )}
        {action.size === "icon" && (
          <span className="sr-only">{action.label}</span>
        )}
      </>
    );

    const href =
      typeof action.href === "function" ? action.href(record) : action.href;

    if (href) {
      return (
        <Button key={action.key} {...buttonProps} asChild>
          <Link href={href}>{buttonContent}</Link>
        </Button>
      );
    }

    return (
      <Button
        key={action.key}
        {...buttonProps}
        onClick={() => action.onClick(record, index)}
      >
        {buttonContent}
      </Button>
    );
  };

  if (loading) {
    return (
      <div className={cn("rounded-lg border bg-card", className)}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn("rounded-lg border bg-card", className)}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn("p-4 font-medium", {
                      "text-left": column.align === "left" || !column.align,
                      "text-center": column.align === "center",
                      "text-right": column.align === "right",
                    })}
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="text-left p-4 font-medium">액션</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((record, index) => (
                  <tr
                    key={(record.id as string | number) || index}
                    className={cn(
                      "border-b last:border-0 hover:bg-muted/50 transition-colors",
                      onRowClick && "cursor-pointer",
                      rowClassName?.(record, index)
                    )}
                    onClick={
                      onRowClick ? () => onRowClick(record, index) : undefined
                    }
                  >
                    {columns.map((column) => {
                      const value = record[column.key];
                      const content = column.render
                        ? column.render(value, record, index)
                        : value;

                      return (
                        <td
                          key={column.key}
                          className={cn("p-4", {
                            "text-left":
                              column.align === "left" || !column.align,
                            "text-center": column.align === "center",
                            "text-right": column.align === "right",
                          })}
                        >
                          {content as React.ReactNode}
                        </td>
                      );
                    })}
                    {actions.length > 0 && (
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {actions.map((action) =>
                            renderActionButton(action, record, index)
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                    className="p-8 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          전체 {totalCount || 0}개 중 {data.length || 0}개 표시
        </span>
      </div>
    </>
  );
}

export default DataTable;
