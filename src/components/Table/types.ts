import { ColumnDef } from '@tanstack/react-table';

export interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
}

export interface DateCellProps {
  timestamp: any;
}

export interface DataIdCellProps {
  data: { id: string; legacy: boolean };
}

export interface MenuCellProps {
  menuActions: {
    icon: string;
    label: string;
    onClick: () => void;
  }[];
}
