import { ColumnDef } from '@tanstack/react-table';

/******************************/
/* Main Table                 */
/******************************/
export type TableRowAction<TData> = {
  icon: string;
  label: string;
  onClick: (data: TData) => void;
};

export interface TableProps<TData> {
  title: string;
  total?: number;
  data: TData[];
  columns: ColumnDef<TData>[];
  rowActions?: TableRowAction<TData>[];
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
  menuActions?: TableRowAction<TData>[];
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
    createdTime: string;
    updatedTime: string;
  };
}
