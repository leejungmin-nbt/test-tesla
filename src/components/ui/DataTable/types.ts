import type { ReactNode, ComponentType } from "react";

export interface DataTableColumn<T = any> {
  key: keyof T;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (value: T[keyof T], record: T, index: number) => ReactNode;
}

export interface DataTableAction<T = any> {
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

export interface DataTableProps<T = any> {
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
