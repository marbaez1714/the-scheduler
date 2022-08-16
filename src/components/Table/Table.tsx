import { ChangeEventHandler, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
  Header,
  OnChangeFn,
} from '@tanstack/react-table';
import classNames from 'classnames';

import { DataIdCell } from './DataIdCell';
import { DateCell } from './DateCell';
import { MenuCell } from './MenuCell';
import { TableProps } from './types';
import { HeaderCell } from './HeaderCell';
import { TextCell } from './TextCell';
import { PhoneNumberCell } from './PhoneNumberCell';

const Table = ({ title, data, columns }: TableProps) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/
  const globalFilterFn: FilterFn<typeof data> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({ itemRank });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setGlobalFilter(e.target.value);
  };

  /******************************/
  /* Table                      */
  /******************************/
  const table = useReactTable({
    state: { sorting, globalFilter },
    data,
    columns,
    globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  /******************************/
  /* Render                     */
  /******************************/
  const sortIconRender = (direction: Header<any, unknown>) => {
    switch (direction.column.getIsSorted()) {
      case 'asc':
        return <ExpandMore />;
      case 'desc':
        return <ExpandLess />;
      default:
        return null;
    }
  };

  return (
    <div className="form-card w-auto">
      <div className="flex items-center">
        <h1 className="form-title mr-auto">{title}</h1>
        <TextField
          label="Search"
          variant="filled"
          className="w-1/2"
          value={globalFilter}
          onChange={handleSearchChange}
          size="small"
        />
      </div>
      <table className="table-auto w-full border-collapse bg-slate-100 drop-shadow whitespace-nowrap">
        <thead className="text-left text-white bg-slate-600 font-medium">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
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
                      {sortIconRender(header)}
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
    </div>
  );
};

Table.HeaderCell = HeaderCell;
Table.DateCell = DateCell;
Table.DataIdCell = DataIdCell;
Table.MenuCell = MenuCell;
Table.TextCell = TextCell;
Table.PhoneNumberCell = PhoneNumberCell;

export default Table;
