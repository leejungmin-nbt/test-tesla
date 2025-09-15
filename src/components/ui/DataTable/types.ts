import type { ReactNode, ComponentType } from "react";

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (value: unknown, record: T, index: number) => ReactNode;
}

export interface DataTableAction<T = Record<string, unknown>> {
  key: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  variant?: "default" | "ghost" | "outline" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  onClick: (record: T, index: number) => void;
  href?: string | ((record: T) => string);
  disabled?: (record: T) => boolean;
  hidden?: (record: T) => boolean;
}

export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  loading?: boolean;
  totalCount?: number;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (record: T, index: number) => void;
  rowClassName?: (record: T, index: number) => string;
}
