import { useState } from 'react';
import {
  SortingState,
  useReactTable,
  getSortedRowModel,
  getCoreRowModel,
  flexRender,
  SortDirection,
} from '@tanstack/react-table';
import { TableProps } from './types';
import classNames from 'classnames';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DateCell } from './DateCell';

const Table = ({ data, columns }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    state: { sorting },
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const getSortIcon = (direction: SortDirection | false) => {
    if (!direction) {
      return null;
    }

    return direction === 'asc' ? <ExpandMore /> : <ExpandLess />;
  };

  return (
    <table className="table-auto w-full border-collapse bg-slate-100 drop-shadow">
      <thead className="text-left text-white font-medium whitespace-nowrap">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="bg-slate-600" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="py-2 px-4 first:pl-6 last:pr-6"
                onClick={header.column.getToggleSortingHandler()}
                colSpan={header.colSpan}
                key={header.id}
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={classNames(
                      'flex justify-between',
                      header.column.getCanSort() && 'cursor-pointer select-none'
                    )}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {getSortIcon(header.column.getIsSorted())}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="border-b last:border-b-0 transition-all" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="py-2 px-4 first:pl-6 last:pr-6" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.DateCell = DateCell;

export default Table;
