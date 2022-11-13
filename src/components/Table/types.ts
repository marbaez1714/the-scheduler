import { ChangeEventHandler } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { JobLegacyStatus } from 'src/api';

/******************************/
/* Main Table                 */
/******************************/
type tableAction = { title: string; onClick: () => void };

export type TableRowAction<TData> = {
  icon: React.ReactNode;
  label: string;
  onClick: (data: TData) => void;
};

export interface TableProps<TData> {
  total?: number;
  data?: TData[];
  columns: ColumnDef<TData>[];
  rowActions?: TableRowAction<TData>[];
  manualPagination?: boolean;
  pageCount?: number;
  loading?: boolean;
  tableAction?: tableAction;
  onPaginationChange?: (page: number) => void;
  onPageSizeChange?: (page: number) => void;
}

export interface TableHeaderProps {
  tableAction?: tableAction;
  searchTerm: string;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
}

export interface TableFooterProps {
  totalRows: number;
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
  searchTerm: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
}

/******************************/
/* Cells                      */
/******************************/
export interface DateCellProps {
  timestamp: string;
}

export interface DataIdCellProps {
  data: { id: string; legacy: boolean };
}

export interface RowMenuCellProps<TData> {
  data: TData;
  menuActions: TableRowAction<TData>[];
}

export interface HeaderCellProps {
  title: string;
  subtitle: string;
}

export interface TextCellProps {
  value?: string;
}

export interface PhoneNumberCellProps {
  value?: string;
}

export interface TimestampCellProps {
  data: {
    createdTime?: string;
    updatedTime?: string;
  };
}

export interface JobLegacyStatusProps {
  value: JobLegacyStatus;
}
