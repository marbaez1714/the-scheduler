import { ColumnDef } from '@tanstack/react-table';

export interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
}

export interface DateCellProps {
  timestamp: any;
}

export interface IconCellProps {
  icon: string;
}
