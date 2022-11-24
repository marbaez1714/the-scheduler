import { ColumnDef, PaginationState } from '@tanstack/react-table';

import { JobLegacyStatus } from 'src/api';

/******************************/
/* Main Table                 */
/******************************/

export type TableRowAction<TData> = {
  icon: React.ReactNode;
  label: string;
  onClick: (data: TData) => void;
};

export interface TableProps<TData> {
  data?: TData[];
  columns: ColumnDef<TData>[];
  rowActions?: TableRowAction<TData>[];
  pageCount?: number;
  loading?: boolean;
  headerRender?: React.ReactNode;
  onPaginationChange?: (pagination: PaginationState) => void;
}

export interface TableFooterProps {
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
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
  value?: string | null;
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
