import { ColumnDef } from '@tanstack/react-table';

export interface TableProps {
  title: string;
  data: any[];
  columns: ColumnDef<any>[];
}

export interface DateCellProps {
  timestamp: string;
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

export interface HeaderCellProps {
  title: string;
  subtitle?: string;
}
