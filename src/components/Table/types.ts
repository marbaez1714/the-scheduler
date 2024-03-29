import {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';

import { MenuProps } from './../Menu';
import { JobLegacyStatus } from 'src/api';

/******************************/
/* Main Table                 */
/******************************/
export interface TableProps<TData> {
  data?: TData[];
  columns: ColumnDef<TData>[];
  pageCount?: number;
  headerRender?: React.ReactNode;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
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
  value: string;
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
  value?: string;
}

export interface JobLegacyStatusProps {
  value: JobLegacyStatus;
}

export interface MenuCellProps {
  items: MenuProps['items'];
}
