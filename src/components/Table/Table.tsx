import { ChangeEventHandler, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
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
} from '@tanstack/react-table';
import classNames from 'classnames';

import { DataIdCell } from './DataIdCell';
import { DateCell } from './DateCell';
import { RowMenuCell } from './RowMenuCell';
import { TableProps } from './types';
import { HeaderCell } from './HeaderCell';
import { TextCell } from './TextCell';
import { PhoneNumberCell } from './PhoneNumberCell';

const Table = <TData extends Record<string, unknown>>({
  title,
  data,
  columns,
  total,
  rowActions,
}: TableProps<TData>) => {
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
  const globalFilterFn: FilterFn<TData> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({ itemRank });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
  const sortIconRender = (direction: Header<TData, unknown>) => {
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
    <div className="flex flex-col w-full shadow">
      {/* Table Header */}
      <div className="flex items-center text-white pr-6 pl-10 py-4 border-b border-b-slate-500 bg-slate-600">
        {/* Title */}
        <div className="flex basis-2/3 items-end">
          <h1 className="text-4xl tracking-wide font-semibold">{title}</h1>
          <p className="text-white/50 ml-4">{total} items</p>
        </div>
        {/* Search */}
        <div className="basis-1/3">
          <input
            placeholder="Search"
            onChange={handleSearchChange}
            value={globalFilter}
            className="bg-slate-100 text-slate-900 p-2 w-full rounded border border-slate-400 shadow"
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-scroll whitespace-nowrap">
        <table className="table-auto w-full border-collapse drop-shadow shadow-lg">
          {/* Table Header */}
          <thead className="text-left text-white">
            {/* Column Headers */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="border-t border-t-slate-500 bg-slate-600"
                key={headerGroup.id}
              >
                {!!rowActions && <th></th>}
                {headerGroup.headers.map((header) => (
                  <th
                    className={classNames(
                      'py-4 px-3 first:pl-4 last:pr-4 font-medium transition-all relative',
                      {
                        'cursor-pointer select-none hover:bg-slate-700 pr-9':
                          header.column.getCanSort(),
                        'bg-slate-700': header.column.getIsSorted(),
                      }
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    colSpan={header.colSpan}
                    key={header.id}
                  >
                    {!header.isPlaceholder && (
                      <>
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                        {!!sortIconRender(header) && (
                          <div className="absolute top-0 right-2 h-full y-6 flex items-center">
                            {sortIconRender(header)}
                          </div>
                        )}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Table Body */}
          <tbody className="bg-slate-100">
            {/* Data / Empty Rows */}
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className="border-b last:border-b-0 transition-all last:rounded-b relative"
                  key={row.id}
                >
                  {!!rowActions && (
                    <RowMenuCell menuActions={rowActions} data={row.original} />
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="py-2 px-3 first:pl-4 last:pr-4 "
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-b last:border-b-0 transition-all text-slate-500">
                <td className="py-4 px-6 text-center text-lg" colSpan={100}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.HeaderCell = HeaderCell;
Table.DateCell = DateCell;
Table.DataIdCell = DataIdCell;
Table.TextCell = TextCell;
Table.PhoneNumberCell = PhoneNumberCell;

export default Table;
